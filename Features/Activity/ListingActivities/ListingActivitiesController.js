import handle from "./ListingActivitiesService.js";

async function invoke(req, reply) {
	const activities = await handle();
	reply.send(activities);
}

export default invoke;
