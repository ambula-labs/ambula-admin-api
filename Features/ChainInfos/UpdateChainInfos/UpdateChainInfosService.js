import { updateChainInfos } from "../../../Repositories/ChainInfosRepository.js";

async function handle(updateReq) {
	await updateChainInfos(updateReq);
	return new ChainInfos(1, updateReq.status, currentDate);
}

export default handle;
