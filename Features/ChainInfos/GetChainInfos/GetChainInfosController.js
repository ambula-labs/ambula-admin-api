import handle from "./GetChainInfosService.js";

async function invoke(req, reply) {
	const chainInfo = await handle();
	reply.send(chainInfo);
}

export default invoke;
