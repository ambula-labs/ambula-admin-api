import { deleteLinode } from "../../../Facades/AnsibleFacade.js";
import updateChainInfosRequest from "../../ChainInfos/UpdateChainInfos/UpdateChainInfosRequest.js";
import updateChainInfosService from "../../ChainInfos/UpdateChainInfos/updateChainInfosService.js";
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
}

export default handle;
