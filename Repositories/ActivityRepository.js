import query from "../db/db.js";
import { listingFromDatabaseResults } from "./Factories/ActivityFactory.js";

export default async function listingActivities(req) {
	try {
		const { offset, limit } = req.query;

		// Validate offset and limit values
		const validatedOffset = Number.isInteger(offset) && offset >= 0 ? parseInt(offset) : 0;
		const validatedLimit = Number.isInteger(limit) && limit > 0 ? parseInt(limit) : 10;

		// Use the validated offset and limit in your SQL query
		const sql = `SELECT * FROM activities ORDER BY date DESC LIMIT ${validatedLimit} OFFSET ${validatedOffset}`;

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
