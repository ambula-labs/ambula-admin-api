import startAmbulaController from "../Features/Ambula/StartAmbula/StartAmbulaController.js";
import rebootAmbulaNodeController from "../Features/Ambula/RebootAmbulaNode/RebootAmbulaNodeController.js";
import stopAmbulaController from "../Features/Ambula/StopAmbula/StopAmbulaController.js";

async function nodesRoute(fastify, options) {
	fastify.post("/start", async (request, reply) => {
		await startAmbulaController(request, reply);
	});
	fastify.post("/reboot/:node_id", async (request, reply) => {
		await rebootAmbulaNodeController(request, reply);
	});
	fastify.post("/stop", async (request, reply) => {
		await stopAmbulaController(request, reply);
	});
}

export default nodesRoute;
