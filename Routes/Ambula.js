import startAmbulaController from "../Features/Ambula/StartAmbula/StartAmbulaController.js";
import stopAmbulaController from "../Features/Ambula/StopAmbula/StopAmbulaController.js";
import addAmbulaNodeController from "../Features/Ambula/AddAmbulaNode/AddAmbulaNodeController.js";
import rebootAmbulaNodeController from "../Features/Ambula/RebootAmbulaNode/RebootAmbulaNodeController.js";
import deleteAmbulaNodeController from "../Features/Ambula/DeleteAmbulaNode/DeleteAmbulaNodeController.js";

async function nodesRoute(fastify, options) {
	fastify.post("/start", async (request, reply) => {
		await startAmbulaController(request, reply);
	});
	fastify.post("/stop", async (request, reply) => {
		await stopAmbulaController(request, reply);
	});
	fastify.post("/nodes", async (request, reply) => {
		await addAmbulaNodeController(request, reply);
	});
	fastify.post("/nodes/:node_id/reboot", async (request, reply) => {
		await rebootAmbulaNodeController(request, reply);
	});
	fastify.delete("/nodes/:node_id", async (request, reply) => {
		await deleteAmbulaNodeController(request, reply);
	});
}

export default nodesRoute;
