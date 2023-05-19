import query from "../db/db.js";
import listingFromDatabaseResults from "./Factories/ActivityFactory.js";

export default async function listingActivities() {
	try {
		const sql = "SELECT * FROM activities ORDER BY date DESC";
		const rows = await query(sql);

		return Array.from(listingFromDatabaseResults(rows));
	} catch (err) {
		throw new Error(`Failed to fetch activities from the database: ${err}`);
	}
}
