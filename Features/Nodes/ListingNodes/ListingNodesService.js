import listingNodes from "../../../Repositories/NodesRepository.js";

async function handle(req) {
	return await listingNodes(req);
}

export default handle;
