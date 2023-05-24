import handle from "./RebootAmbulaNodeService.js";

async function invoke(req, reply) {
	await handle(req);
	reply.send(200);
}

export default invoke;
