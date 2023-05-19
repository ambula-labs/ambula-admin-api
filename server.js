const fastify = require("fastify")();
const formBody = require("@fastify/formbody");

fastify.register(formBody);
const { spawn } = require("child_process");

// Define the route that triggers the Ansible deploy playbook
fastify.post("/deploy", async (request, reply) => {
	// Label of the linode you want to deploy
	const { linode_label } = request.body;
	if (typeof linode_label !== "string" || !linode_label.trim()) {
		return reply.code(400).send("Invalid linode_label");
	}

	// Spawn a new child process to run the Ansible playbook
	const ansible = spawn("ansible-playbook", ["../deploylinode.yml", "--extra-vars", `linode_label=${linode_label}`]);

	// Log the output of the child process to the console
	ansible.stdout.on("data", (data) => {
		console.log(`stdout: ${data}`);
	});

	// Handle errors and exit code of the child process
	ansible.on("close", (code) => {
		console.log(`child process exited with code ${code}`);
		if (code === 0) {
			reply.send({ success: true });
		} else {
			reply.status(500).send({ error: `Ansible playbook failed with exit code ${code}` });
		}
	});
});

// Define the route that triggers the Ansible delete playbook
fastify.post("/delete", async (request, reply) => {
	// Label of the linode you want to delete
	const { linode_label } = request.body;
	if (typeof linode_label !== "string" || !linode_label.trim()) {
		return reply.code(400).send("Invalid linode_label");
	}

	// Spawn a new child process to run the Ansible playbook
	const ansible = spawn("ansible-playbook", ["../deletelinode.yml", "--extra-vars", `linode_label=${linode_label}`]);

	// Log the output of the child process to the console
	ansible.stdout.on("data", (data) => {
		console.log(`stdout: ${data}`);
	});

	// Handle errors and exit code of the child process
	ansible.on("close", (code) => {
		console.log(`child process exited with code ${code}`);
		if (code === 0) {
			reply.send({ success: true });
		} else {
			reply.status(500).send({ error: `Ansible playbook failed with exit code ${code}` });
		}
	});
});

fastify.get("/stream-logs", { websocket: true }, (connection) => {
	let messageCount = 0;
	const intervalId = setInterval(() => {
		const message = `Log message ${messageCount}`;
		connection.socket.send(JSON.stringify({ message }));
		messageCount++;

		// Stop sending messages after 10 iterations
		if (messageCount === 10) {
			clearInterval(intervalId);
			connection.socket.close();
		}
	}, 1000);

	connection.socket.on("close", () => {
		clearInterval(intervalId);
	});
});

// Start the server on port 3000
fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening on ${address}`);
});
