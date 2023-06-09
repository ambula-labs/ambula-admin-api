import ChainInfos from "../../Models/ChainInfos.js";

export default function fromDatabaseResult(data) {
	if (!data || !data.id || data.status === undefined || !(data.dateStatusChanged instanceof Date)) {
		throw new Error("Invalid data");
	}

	const { id, status, dateStatusChanged } = data;

	return new ChainInfos(id, status, dateStatusChanged);
}
