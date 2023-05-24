import UpdateChainInfosRequest from "./UpdateChainInfosRequest.js";

class UpdateChainInfosRequestFactory {
	static createUpdateChainInfosRequest(req) {
		const { status } = req.body;

		if (status === undefined) {
			throw new Error("Missing required parameters");
		}

		return new UpdateChainInfosRequest(status);
	}
}

export default UpdateChainInfosRequestFactory;
