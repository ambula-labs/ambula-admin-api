import handle from "./UpdateChainInfosService.js";
import UpdateChainInfosRequestFactory from "./UpdateChainInfosRequestFactory.js";

async function invoke(req, reply) {
	const updateChainInfosRequest = UpdateChainInfosRequestFactory.createUpdateChainInfosRequest(req);
	const chainInfo = await handle(updateChainInfosRequest);
	reply.send(chainInfo);
}

export default invoke;
