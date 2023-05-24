import { getNode } from "../../../Repositories/NodesRepository.js";

async function handle(req) {
	return await getNode(req.params.node_id);
}

export default handle;
