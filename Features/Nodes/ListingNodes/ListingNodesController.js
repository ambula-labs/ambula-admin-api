import handle from "./ListingNodesService.js";

async function invoke(req, reply) {
	const nodes = await handle(req);
	reply.send(nodes);
}

export default invoke;
