import { executeLinode } from "../../../Facades/AnsibleFacade.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";
import { getNode, getNodeFromName } from "../../../Repositories/NodesRepository.js";

async function handle(req) {
	const node = await getNode(req.params.node_id);

	const ipAlice = await getNodeFromName("Alice");
	await executeLinode(node.name, node.ip, ipAlice);

	const insertActRequest = new insertActivityRequest("Rebooting " + node.name + " node");
	await insertActivityService(insertActRequest);
}

export default handle;
