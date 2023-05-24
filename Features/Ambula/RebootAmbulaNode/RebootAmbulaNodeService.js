import { executeLinode } from "../../../Facades/AnsibleFacade.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";
import { getNode } from "../../../Repositories/NodesRepository.js";

async function handle(req) {
	node = await getNode(req.params.node_id);
	await executeLinode(node.ip);

	const insertActRequest = new insertActivityRequest("Rebooting " + node.name + " node");
	await insertActivityService(insertActRequest);
}

export default handle;
