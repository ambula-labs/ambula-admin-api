import handle from "./StartAmbulaService.js";

async function invoke(req, reply) {
	const { linode_label } = req.body;
	if (typeof linode_label !== "string" || !linode_label.trim()) {
		return reply.code(400).send("Invalid linodeLabel");
	}

	code = await handle(linode_label);
	if (code === 0) {
		reply.send({ success: true });
	} else {
		reply.status(500).send({ error: `Ansible playbook failed with exit code ${code}` });
	}
}

export default invoke;
