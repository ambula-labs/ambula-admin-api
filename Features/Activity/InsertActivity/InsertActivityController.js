import handle from "./InsertActivityService.js";
import InsertActivityRequestFactory from "./InsertActivityRequestFactory.js";

async function invoke(req, reply) {
	const insertActivityRequest = InsertActivityRequestFactory.createInsertActivityRequest(req);
	const activity = await handle(insertActivityRequest);
	reply.send(activity);
}

export default invoke;
