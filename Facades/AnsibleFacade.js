import { spawn } from "child_process";

export default function createLinode(linodeLabel) {
	return new Promise((resolve, reject) => {
		// Spawn a new child process to run the Ansible playbook
		const ansible = spawn("ansible-playbook", ["./AnsiblePlaybooks/DeployLinode.yml", "--extra-vars", `linode_label=${linodeLabel}`]);

		let linodeIp = ""; // Variable to store the linode_ip value

		// Log the output of the child process to the console
		ansible.stdout.on("data", (data) => {
			const output = data.toString();
			console.log(`stdout: ${output}`);

			// Check if the output contains the linode_ip variable
			if (output.includes("linode_ip")) {
				// Extract the linode_ip value from the output
				const match = output.match(/linode_ip\": \"(.+?)\"/);
				if (match) {
					linodeIp = match[1];
				}
			}
		});

		// Handle errors and exit code of the child process
		ansible.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
			if (code === 0) {
				resolve(linodeIp); // Resolve the linode_ip value
			} else {
				reject(new Error(`Ansible playbook failed with exit code ${code}`));
			}
		});
	});
}

export async function deleteLinode(linodeLabel) {
	return new Promise((resolve, reject) => {
		// Spawn a new child process to run the Ansible playbook
		const ansible = spawn("ansible-playbook", ["./AnsiblePlaybooks/DeleteLinode.yml", "--extra-vars", `linode_label=${linodeLabel}`]);

		// Log the output of the child process to the console
		ansible.stdout.on("data", (data) => {
			console.log(`stdout: ${data}`);
		});

		// Handle errors and exit code of the child process
		ansible.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
			resolve(code);
		});
	});
}
