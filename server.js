const fastify = require("fastify")();
const { spawn } = require("child_process");

// Define the route that triggers the Ansible playbook
fastify.get("/deploy", async (request, reply) => {
	// Spawn a new child process to run the Ansible playbook
	const ansible = spawn("ansible-playbook", ["/path/to/your/playbook.yml"]);

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

// Start the server on port 3000
fastify.listen(3000, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening on ${address}`);
});
