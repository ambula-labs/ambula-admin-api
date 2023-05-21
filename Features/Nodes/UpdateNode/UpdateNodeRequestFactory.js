import UpdateNodeRequest from "./UpdateNodeRequest.js";

class UpdateNodeRequestFactory {
	static createUpdateNodeRequest(req) {
		const { name, ip, status, type } = req.body;
		const id = req.params.node_id;

		if (id === undefined) {
			throw new Error("Missing node id");
		}

		return new UpdateNodeRequest(id, name, ip, status, type);
	}
}

export default UpdateNodeRequestFactory;
