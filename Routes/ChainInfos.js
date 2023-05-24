import getChainInfosController from "../Features/ChainInfos/GetChainInfos/GetChainInfosController.js";
import updateChainInfosController from "../Features/ChainInfos/UpdateChainInfos/UpdateChainInfosController.js";

async function chainInfosRoute(fastify, options) {
	fastify.get("/", async (request, reply) => {
		await getChainInfosController(request, reply);
	});
	fastify.put("/", async (request, reply) => {
		await updateChainInfosController(request, reply);
	});
}

export default chainInfosRoute;
