import handle from "./AddAmbulaNodeService.js";

async function invoke(req, reply) {
	await handle();
	reply.send(200);
}

export default invoke;
