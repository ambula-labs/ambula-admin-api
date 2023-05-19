import { listingActivities } from "../../../Repositories/ActivityRepository.js";

async function handle() {
	return await listingActivities();
}

export default handle;
