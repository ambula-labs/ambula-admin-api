import { updateChainInfos } from "../../../Repositories/ChainInfosRepository.js";
import ChainInfos from "../../../Models/ChainInfos.js";

async function handle(updateReq) {
	await updateChainInfos(updateReq);
	return new ChainInfos(1, updateReq.status, updateReq.date);
}

export default handle;
