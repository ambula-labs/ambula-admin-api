import handle from "./InsertNodeService.js";
import InsertNodeRequestFactory from "./InsertNodeRequestFactory.js";

async function invoke(req, reply) {
	const insertNodeRequest = InsertNodeRequestFactory.createInsertActivityRequest(req);
	const node = await handle(insertNodeRequest);
	reply.send(node);
}

export default invoke;
