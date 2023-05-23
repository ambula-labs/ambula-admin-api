import { spawn } from "child_process";

export default async function createLinode(linodeLabel) {
	return new Promise((resolve, reject) => {
		// Spawn a new child process to run the Ansible playbook
		const ansible = spawn("ansible-playbook", ["./AnsiblePlaybooks/CreateLinode.yml", "--extra-vars", `linode_label=${linodeLabel}`]);

		let linodeIp = ""; // Variable to store the linode_ip value

		// Log the output of the child process to the console
		ansible.stdout.on("data", (data) => {
			const output = data.toString();
			console.log(`stdout: ${output}`);

			// Check if the output contains the linode_instance.instance.ipv4 variable
			if (output.includes("linode_instance.instance.ipv4")) {
				// Extract the linode_instance.instance.ipv4 value from the output
				const match = output.match(/linode_instance\.instance\.ipv4\": \"(.+?)\"/);
				if (match) {
					linodeIp = match[1];
				}
			}
		});

		// Handle errors and exit code of the child process
		ansible.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
			if (code === 0) {
				resolve(linodeIp); // Resolve the linodeIp value
			} else {
				reject(new Error(`Ansible playbook failed with exit code ${code}`));
			}
		});
	});
}

export async function executeLinode(host) {
	return new Promise((resolve, reject) => {
		// Spawn a new child process to run the Ansible playbook
		const ansible = spawn("ansible-playbook", ["-i", `${host},`, "./AnsiblePlaybooks/ExecuteLinode.yml", "--extra-vars", `inventory_hostname=${host} ansible_password=@Ambula123!`]);

		// Log the output of the child process to the console
		ansible.stdout.on("data", (data) => {
			const output = data.toString();
			console.log(`stdout: ${output}`);
		});

		// Handle errors and exit code of the child process
		ansible.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
			if (code === 0) {
				resolve(code);
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
