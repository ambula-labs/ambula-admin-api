import { updateChainInfos } from "../../../Repositories/ChainInfosRepository.js";

async function handle(updateReq) {
	return await updateChainInfos(updateReq);
}

export default handle;
