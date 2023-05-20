import UpdateChainInfosRequest from "./UpdateChainInfosRequest.js";

class UpdateChainInfosRequestFactory {
	static createUpdateChainInfosRequest(req) {
		const { status } = req.body;

		if (status === undefined) {
			throw new Error("Missing required parameters");
		}

		// Additional validation logic if needed

		return new UpdateChainInfosRequest(status);
	}
}

export default UpdateChainInfosRequestFactory;
