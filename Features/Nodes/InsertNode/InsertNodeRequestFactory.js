import InsertNodeRequest from "./InsertNodeRequest.js";

class InsertNodeRequestFactory {
	static createInsertNodeRequest(req) {
		const { name, ip, status, type } = req.body;

		if (name === undefined || ip === undefined || status === undefined || type === undefined) {
			throw new Error("Missing required parameters");
		}

		return new InsertNodeRequest(name, ip, status, type);
	}
}

export default InsertNodeRequestFactory;
