import deleteNode from "../../../Repositories/NodesRepository.js";

async function handle(req) {
	await deleteNode(req.params.node_id);
}

export default handle;
