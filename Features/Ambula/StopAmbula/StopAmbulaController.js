import handle from "./StopAmbulaService.js";

async function invoke(req, reply) {
	await handle();
	reply.status(200).send();
}

export default invoke;
