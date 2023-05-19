import Activity from "../../Models/Activity.js";

export default function fromDatabaseResult(data) {
	if (!data || !data.id || !data.message || !data.date) {
		throw new Error("Invalid data");
	}

	const { id, message, date } = data;
	const parsedDate = new Date(date); // Parse the date string

	return new Activity(id, message, parsedDate);
}

export function* listingFromDatabaseResults(items) {
	for (const item of items) {
		yield fromDatabaseResult(item);
	}
}
