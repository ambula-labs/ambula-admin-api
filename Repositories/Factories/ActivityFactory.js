import Activity from "../../Models/Activity.js";

export function fromDatabaseResult(data) {
	if (!data || !data.id || !data.message || !data.date) {
		throw new Error("Invalid user data");
	}

	return new Activity(data.id, data.message, data.date);
}

export function* listingFromDatabaseResults(items) {
	for (const item of items) {
		yield fromDatabaseResult(item);
	}
}
