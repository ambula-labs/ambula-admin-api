import handle from "./UpdateNodeService.js";
import UpdateNodeRequestFactory from "./UpdateNodeRequestFactory.js";

async function invoke(req, reply) {
	const updateNodeRequest = UpdateNodeRequestFactory.createUpdateNodeRequest(req);
	const node = await handle(updateNodeRequest);
	reply.send(node);
}

export default invoke;
