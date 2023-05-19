import getChainInfos from "../../../Repositories/ChainInfosRepository.js";

async function handle() {
	return await getChainInfos();
}

export default handle;
