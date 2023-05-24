import { deleteLinode } from "../../../Facades/AnsibleFacade.js";
import updateChainInfosRequest from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosRequest.js";
import updateChainInfosService from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosService.js";
import insertActivityRequest from "../../Activity/InsertActivity/InsertActivityRequest.js";
import insertActivityService from "../../Activity/InsertActivity/InsertActivityService.js";
import { deleteNodeFromName } from "../../../Repositories/NodesRepository.js";

async function handle() {
	await deleteLinode("Alice");
	await deleteLinode("Bob");
	await deleteLinode("Charlie");
	await deleteNodeFromName("Alice");
	await deleteNodeFromName("Bob");
	await deleteNodeFromName("Charlie");

	const updateRequest = new updateChainInfosRequest(0);
	await updateChainInfosService(updateRequest);

	const insertRequest = new insertActivityRequest("Stopping Ambula Chain");
	await insertActivityService(insertRequest);
}

export default handle;
