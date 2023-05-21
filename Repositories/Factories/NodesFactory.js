import Node from "../../Models/Node.js";

export default function fromDatabaseResult(data) {
	if (!data || !data.id || !data.name || !data.ip || !(data.dateStatusChanged instanceof Date || !data.status || !data.type)) {
		throw new Error("Invalid data");
	}

	const { id, name, ip, dateStatusChanged, status, type } = data;

	return new Node(id, name, ip, dateStatusChanged, status, type);
}

export function listingFromDatabaseResults(items) {
	const results = [];
	for (const item of items) {
		results.push(fromDatabaseResult(item));
	}
	return results;
}
