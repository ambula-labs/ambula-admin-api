import fastify from "fastify";
import formBody from "@fastify/formbody";
import activitiesRoute from "./Routes/Activities.js";
import chainInfosRoute from "./Routes/ChainInfos.js";
import nodesRoute from "./Routes/Nodes.js";
import ambulaRoute from "./Routes/Ambula.js";

const app = fastify();
app.register(formBody);

app.addHook("onRequest", (request, reply, done) => {
	// Set CORS headers
	reply.header("Access-Control-Allow-Origin", "*");
	reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// Handle preflight requests
	if (request.method === "OPTIONS") {
		reply.code(200).send();
	} else {
		done();
	}
});

app.register(activitiesRoute, { prefix: "/activities" });
app.register(chainInfosRoute, { prefix: "/chain-infos" });
app.register(nodesRoute, { prefix: "/nodes" });
app.register(ambulaRoute, { prefix: "/ambula" });

// Health check
app.get("/", async (request, reply) => {
	reply.code(200).send();
});

// Start the server on port 3000
app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening on ${address}`);
});
