import fastify from "fastify";
import formBody from "@fastify/formbody";
import activitiesRoute from "./Routes/Activities.js";
import chainInfosRoute from "./Routes/ChainInfos.js";
import { spawn } from "child_process";

const app = fastify();
app.register(formBody);

app.addHook("onRequest", (request, reply, done) => {
	// Set CORS headers
	reply.header("Access-Control-Allow-Origin", "*");
	reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// Handle preflight requests
	if (request.method === "OPTIONS") {
		reply.code(200).send();
	} else {
		done();
	}
});

app.register(activitiesRoute, { prefix: "/activities" });
app.register(chainInfosRoute, { prefix: "/chain-infos" });

app.get("/", async (request, reply) => {
	// Health check
	reply.send("Hello, world!");
});

// Define the route that triggers the Ansible deploy playbook
app.post("/deploy", async (request, reply) => {
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
app.post("/delete", async (request, reply) => {
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

app.get("/stream-logs", { websocket: true }, (connection) => {
	let messageCount = 0;
	const intervalId = setInterval(() => {
		const message = `Log message ${messageCount}`;
		connection.socket.send(JSON.stringify({ message }));
		messageCount++;
	}, 1000);

	connection.socket.on("close", () => {
		clearInterval(intervalId);
	});
});

// Start the server on port 3000
app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening on ${address}`);
});
