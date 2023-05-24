import createLinode from "../../../Facades/AnsibleFacade.js";
import { executeLinode } from "../../../Facades/AnsibleFacade.js";
import updateChainInfosRequest from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosRequest.js";
import updateChainInfosService from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosService.js";
import insertNodeRequest from "../../Nodes/InsertNode/InsertNodeRequest.js";
import insertNodeService from "../../Nodes/InsertNode/InsertNodeService.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";

async function handle() {
	const ipAlice = await createLinode("Alice");
	const ipBob = await createLinode("Bob");
	const ipCharlie = await createLinode("Charlie");

	await executeLinode("Alice", ipAlice, ipAlice);
	await executeLinode("Bob", ipBob, ipAlice);
	await executeLinode("Charlie", ipCharlie, ipAlice);

	var insertRequest = new insertNodeRequest("Alice", ipAlice, "online", 0);
	await insertNodeService(insertRequest);
	insertRequest = new insertNodeRequest("Bob", ipBob, "online", 0);
	await insertNodeService(insertRequest);
	insertRequest = new insertNodeRequest("Charlie", ipCharlie, "online", 0);
	await insertNodeService(insertRequest);

	const updateRequest = new updateChainInfosRequest(1);
	await updateChainInfosService(updateRequest);

	const insertActRequest = new insertActivityRequest("Starting Ambula Chain");
	await insertActivityService(insertActRequest);
}

export default handle;
