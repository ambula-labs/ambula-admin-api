import { deleteLinode } from "../../../Facades/AnsibleFacade.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";
import deleteNodeService from "../../Nodes/DeleteNode/DeleteNodeService.js";
import { getNode } from "../../../Repositories/NodesRepository.js";

async function handle(req) {
	const node = await getNode(req.params.node_id);
	await deleteLinode(node.name);
	await deleteNodeService(req.params.node_id);

	const insertActRequest = new insertActivityRequest("Deleting " + node.name + " node");
	await insertActivityService(insertActRequest);
}

export default handle;
