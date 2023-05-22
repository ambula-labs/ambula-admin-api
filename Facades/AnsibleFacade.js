export default async function createLinode(linodeLabel) {
	// Spawn a new child process to run the Ansible playbook
	const ansible = spawn("ansible-playbook", ["../deploylinode.yml", "--extra-vars", `linode_label=${linodeLabel}`]);

	// Log the output of the child process to the console
	ansible.stdout.on("data", (data) => {
		console.log(`stdout: ${data}`);
	});

	// Handle errors and exit code of the child process
	ansible.on("close", (code) => {
		console.log(`child process exited with code ${code}`);
		return code;
	});
}

export async function deleteLinode(linodeLabel) {
	// Spawn a new child process to run the Ansible playbook
	const ansible = spawn("ansible-playbook", ["../deletelinode.yml", "--extra-vars", `linodeLabel=${linodeLabel}`]);

	// Log the output of the child process to the console
	ansible.stdout.on("data", (data) => {
		console.log(`stdout: ${data}`);
	});

	// Handle errors and exit code of the child process
	ansible.on("close", (code) => {
		console.log(`child process exited with code ${code}`);
		return code;
	});
}
