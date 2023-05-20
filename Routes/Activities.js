import listingActivitiesController from "../Features/Activity/ListingActivities/ListingActivitiesController.js";
import insertActivityController from "../Features/Activity/InsertActivity/InsertActivityController.js";

async function activitiesRoute(fastify, options) {
	fastify.get("/", async (request, reply) => {
		await listingActivitiesController(request, reply);
	});
	fastify.post("/", async (request, reply) => {
		await insertActivityController(request, reply);
	});
}

export default activitiesRoute;
