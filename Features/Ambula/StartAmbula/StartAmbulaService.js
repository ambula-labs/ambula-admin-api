import createLinode from "../../../Facades/AnsibleFacade.js";
import updateChainInfosRequest from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosRequest.js";
import updateChainInfosService from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosService.js";
import insertNodeRequest from "../../Nodes/InsertNode/InsertNodeRequest.js";
import insertNodeService from "../../Nodes/InsertNode/InsertNodeService.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";

async function handle() {
	await createLinode("alice");
	await createLinode("bob");
	await createLinode("charlie");

	const insertRequest = new insertNodeRequest("alice", "ip", "online", 0);
	await insertNodeService(insertRequest);
	insertRequest.name = "bob";
	await insertNodeService(insertRequest);
	insertRequest.name = "charlie";
	await insertNodeService(insertRequest);

	const updateRequest = new updateChainInfosRequest(1);
	await updateChainInfosService(updateRequest);

	const insertActRequest = new insertActivityRequest("Stopping Chain");
	await insertActivityService(insertActRequest);
}

export default handle;
