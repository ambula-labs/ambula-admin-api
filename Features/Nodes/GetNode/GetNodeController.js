import handle from "./GetNodeService.js";

async function invoke(req, reply) {
	const node = await handle(req);
	reply.send(node);
}

export default invoke;
