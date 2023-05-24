import createLinode from "../../../Facades/AnsibleFacade.js";
import { executeLinode } from "../../../Facades/AnsibleFacade.js";
import insertNodeRequest from "../../Nodes/InsertNode/InsertNodeRequest.js";
import insertNodeService from "../../Nodes/InsertNode/InsertNodeService.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";
import { getNodesNames, getLastIdInNodes } from "../../../Repositories/NodesRepository.js";

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handle() {
	const nodeNames = await getNodesNames();

	const predefinedName = ["Charlie", "Dave", "Eve", "Ferdie"];

	let result = null;

	for (let i = 0; i < predefinedName.length; i++) {
		let isInside = false;
		for (let i = 0; i < nodeNames.length; i++) {
			if (predefinedName[i] === nodeNames[i].name) {
				isInside = true;
			}
		}
		if (!isInside) {
			result = predefinedName[i];
			break;
		}
	}

	if (result === null) {
		let id = await getLastIdInNodes();
		result = "Unamed" + (parseInt(id) + 1);
	}

	const ipResult = await createLinode(result);
	await delay(20000);
	await executeLinode(result, ipResult);

	var insertRequest = new insertNodeRequest(result, ipResult, "online", 0);
	await insertNodeService(insertRequest);

	const insertActRequest = new insertActivityRequest("Adding " + result + " node");
	await insertActivityService(insertActRequest);
}

export default handle;
