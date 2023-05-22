import startAmbulaController from "../Features/Ambula/StartAmbula/StartAmbulaController.js";
//import restartAmbulaController from "../Features/Ambula/RestartAmbula/RestartAmbulaController.js";
import stopAmbulaController from "../Features/Ambula/StopAmbula/StopAmbulaController.js";

async function nodesRoute(fastify, options) {
	fastify.post("/start", async (request, reply) => {
		await startAmbulaController(request, reply);
	});
	// fastify.post("/restart", async (request, reply) => {
	// 	await restartAmbulaController(request, reply);
	// });
	fastify.post("/stop", async (request, reply) => {
		await stopAmbulaController(request, reply);
	});
}

export default nodesRoute;
