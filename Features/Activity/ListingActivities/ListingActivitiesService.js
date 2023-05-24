import listingActivities from "../../../Repositories/ActivityRepository.js";

async function handle(req) {
	return await listingActivities(req);
}

export default handle;
