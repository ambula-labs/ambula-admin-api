import createLinode from "../../../Facades/AnsibleFacade.js";
import { executeLinode } from "../../../Facades/AnsibleFacade.js";
import insertNodeRequest from "../../Nodes/InsertNode/InsertNodeRequest.js";
import insertNodeService from "../../Nodes/InsertNode/InsertNodeService.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";
import { getNodesNames, getLastIdInNodes } from "../../../Repositories/NodesRepository.js";

async function handle() {
	const nodeNames = await getNodesNames();
	console.log(nodeNames);

	const predefinedName = ["Charlie", "Dave", "Eve", "Ferdie"];

	let result = null;
	for (let i = 0; i < nodeNames.length; i++) {
		const currentElement = nodeNames[i].name;
		if (!predefinedName.includes(currentElement)) {
			result = currentElement;
			break;
		}
	}

	if (result === null) {
		let id = await getLastIdInNodes();
		result = "Unamed" + (parseInt(id) + 1);
	}

	const ipResult = await createLinode(result);
	await executeLinode(result, ipResult);

	var insertRequest = new insertNodeRequest(result, ipResult, "online", 0);
	await insertNodeService(insertRequest);

	const insertActRequest = new insertActivityRequest("Adding " + result + " node");
	await insertActivityService(insertActRequest);
}

export default handle;
