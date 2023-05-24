import InsertActivityRequest from "./InsertActivityRequest.js";

class InsertActivityRequestFactory {
	static createInsertActivityRequest(req) {
		const { message } = req.body;

		if (message === undefined) {
			throw new Error("Missing required parameters");
		}

		return new InsertActivityRequest(message);
	}
}

export default InsertActivityRequestFactory;
