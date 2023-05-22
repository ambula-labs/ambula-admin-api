import { deleteLinode } from "../../../Facades/AnsibleFacade.js";
import updateChainInfosRequest from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosRequest.js";
import updateChainInfosService from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosService.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";
import { deleteNodeFromName } from "../../../Repositories/NodesRepository.js";

async function handle() {
	await deleteLinode("alice");
	await deleteLinode("bob");
	await deleteLinode("charlie");
	await deleteNodeFromName("alice");
	await deleteNodeFromName("bob");
	await deleteNodeFromName("charlie");

	const updateRequest = new updateChainInfosRequest(0);
	await updateChainInfosService(updateRequest);

	const insertRequest = new insertActivityRequest("Stopping Ambula Chain");
	await insertActivityService(insertRequest);
}

export default handle;
