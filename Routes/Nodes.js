import getNodeController from "../Features/Nodes/GetNode/GetNodeController.js";
import updateNodeController from "../Features/Nodes/UpdateNode/UpdateNodeController.js";
import insertNodeController from "../Features/Nodes/InsertNode/InsertNodeController.js";
import listingNodeController from "../Features/Nodes/ListingNodes/ListingNodesController.js";
import deleteNodeController from "../Features/Nodes/DeleteNode/DeleteNodeController.js";

async function nodesRoute(fastify, options) {
	fastify.get("/:node_id", async (request, reply) => {
		await getNodeController(request, reply);
	});
	fastify.put("/:node_id", async (request, reply) => {
		await updateNodeController(request, reply);
	});
	fastify.delete("/:node_id", async (request, reply) => {
		await deleteNodeController(request, reply);
	});

	fastify.get("/", async (request, reply) => {
		await listingNodeController(request, reply);
	});
	fastify.post("/", async (request, reply) => {
		await insertNodeController(request, reply);
	});
}

export default nodesRoute;
