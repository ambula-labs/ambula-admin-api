import handle from "./StartAmbulaService.js";

async function invoke(req, reply) {
	await handle();
	reply.send(200);
}

export default invoke;
