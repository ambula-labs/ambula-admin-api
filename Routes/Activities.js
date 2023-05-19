import invoke from "../Features/Activity/ListingActivities/ListingActivitiesController.js";

async function activitiesRoute(fastify, options) {
	fastify.get("/", async (request, reply) => {
		await invoke(request, reply);
	});
}

export default activitiesRoute;
