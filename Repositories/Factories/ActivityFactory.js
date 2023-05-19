import Activity from "../../Models/Activity.js";

export default function fromDatabaseResult(data) {
	if (!data || !data.id || !data.message || !(data.date instanceof Date)) {
		throw new Error("Invalid data");
	}

	const { id, message, date } = data;

	return new Activity(id, message, date);
}

export function listingFromDatabaseResults(items) {
	const results = [];
	for (const item of items) {
		results.push(fromDatabaseResult(item));
	}
	return results;
}
