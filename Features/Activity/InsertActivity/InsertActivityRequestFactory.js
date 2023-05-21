import LisitingActivityRequest from "./LisitingActivityRequest.js";

class InsertActivityRequestFactory {
	static createInsertActivityRequest(req) {
		const { message } = req.body;

		if (message === undefined) {
			throw new Error("Missing required parameters");
		}

		return new LisitingActivityRequest(message);
	}
}

export default ListingActivityRequestFactory;
