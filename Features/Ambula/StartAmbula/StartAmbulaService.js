import createLinode from "../../../Facades/AnsibleFacade.js";
import { executeLinode } from "../../../Facades/AnsibleFacade.js";
import updateChainInfosRequest from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosRequest.js";
import updateChainInfosService from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosService.js";
import insertNodeRequest from "../../Nodes/InsertNode/InsertNodeRequest.js";
import insertNodeService from "../../Nodes/InsertNode/InsertNodeService.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";

async function handle() {
	const ipAlice = await createLinode("alice");
	await delay(5000);

	await executeLinode(ipAlice);

	const ipBob = await createLinode("bob");
	await delay(5000);
	await executeLinode(ipBob);

	const ipCharlie = await createLinode("charlie");
	await delay(5000);
	await executeLinode(ipCharlie);

	const insertRequest = new insertNodeRequest("alice", ipAlice, "online", 0);
	await insertNodeService(insertRequest);
	insertRequest = new insertNodeRequest("bob", ipBob, "online", 0);
	await insertNodeService(insertRequest);
	insertRequest.name = new insertNodeRequest("charlie", ipCharlie, "online", 0);
	await insertNodeService(insertRequest);

	const updateRequest = new updateChainInfosRequest(1);
	await updateChainInfosService(updateRequest);

	const insertActRequest = new insertActivityRequest("Starting Ambula Chain");
	await insertActivityService(insertActRequest);
}

export default handle;
