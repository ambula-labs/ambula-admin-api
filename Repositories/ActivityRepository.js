import query from "../db/db.js";
import { listingFromDatabaseResults } from "./Factories/ActivityFactory.js";

export default async function listingActivities(req) {
	try {
		let sql = "SELECT * FROM activities ORDER BY date DESC";

		if (Number.isInteger(req.limit) && req.limit > 0) {
			sql += ` LIMIT ${req.limit}`;
		}

		if (Number.isInteger(req.offset) && req.offset >= 0) {
			sql += ` OFFSET ${req.offset}`;
		}
		const rows = await query(sql);

		return listingFromDatabaseResults(rows);
	} catch (err) {
		throw new Error(`Failed to fetch activities from the database: ${err}`);
	}
}

export async function insertActivity(insertReq) {
	try {
		const date = insertReq.date.toISOString().slice(0, 19).replace("T", " ");
		const escapedMessage = insertReq.message.replace(/'/g, "''"); // Escape single quotes
		const sql = `INSERT INTO activities (message, date) VALUES ("${escapedMessage}", "${date}");`;
		const result = await query(sql);
		return result.insertId;
	} catch (err) {
		throw new Error(`Failed to insert activity into the database: ${err}`);
	}
}
