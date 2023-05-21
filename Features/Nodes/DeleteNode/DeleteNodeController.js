import handle from "./DeleteNodeService.js";

async function invoke(req, reply) {
	await handle(req);
	reply.code(204).send();
}

export default invoke;
