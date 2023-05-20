import { insertActivity } from "../../../Repositories/ActivityRepository.js";
import Activity from "../../../Models/Activity.js";

async function handle(insertReq) {
	const id = await insertActivity(insertReq);
	return new Activity(id, insertReq.message, insertReq.date);
}

export default handle;
