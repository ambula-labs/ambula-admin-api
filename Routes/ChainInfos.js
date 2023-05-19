import invoke from "../Features/ChainInfos/GetChainInfos/GetChainInfosController.js";

async function chainInfosRoute(fastify, options) {
	fastify.get("/", async (request, reply) => {
		await invoke(request, reply);
	});
}

export default chainInfosRoute;
