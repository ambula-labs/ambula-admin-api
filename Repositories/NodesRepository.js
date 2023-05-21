import query from "../db/db.js";
import fromDatabaseResult from "./Factories/NodesFactory.js";
import { listingFromDatabaseResults } from "./Factories/NodesFactory.js";

export default async function listingNodes(req) {
	try {
		const { offset, limit } = req.query;

		// Validate offset and limit values
		const validatedOffset = Number.isInteger(offset) && offset >= 0 ? parseInt(offset) : 0;
		const validatedLimit = Number.isInteger(parseInt(limit)) && parseInt(limit) > 0 ? parseInt(limit) : 10;

		// Use the validated offset and limit in your SQL query
		const sql = `SELECT * FROM nodes LIMIT ${validatedLimit} OFFSET ${validatedOffset}`;
		const rows = await query(sql);

		return listingFromDatabaseResults(rows);
	} catch (err) {
		throw new Error(`Failed to fetch nodes from the database: ${err}`);
	}
}

export async function getNode(id) {
	try {
		const sql = `SELECT * FROM nodes WHERE id = '${id}'`;
		const rows = await query(sql);
		return fromDatabaseResult(rows[0]);
	} catch (err) {
		throw new Error(`Failed to fetch node ${id} from the database: ${err}`);
	}
}

export async function insertNode(insertReq) {
	try {
		const date = insertReq.dateStatusChanged.toISOString().slice(0, 19).replace("T", " ");
		const sql = `INSERT INTO nodes (name, ip, dateStatusChanged, status, type) VALUES ("${insertReq.name}", "${insertReq.ip}", "${date}", "${insertReq.status}", "${insertReq.type}");`;
		const result = await query(sql);
		return result.insertId;
	} catch (err) {
		throw new Error(`Failed to insert node into the database: ${err}`);
	}
}

export async function updateNode(updateReq) {
	try {
		const updateColumns = Object.keys(updateReq)
			.filter((key) => updateReq[key] !== undefined)
			.map((key) => `${key} = "${updateReq[key]}"`)
			.join(", ");

		dateStatusChanged = new Date().toISOString().slice(0, 19).replace("T", " ");
		const sql = `UPDATE nodes SET ${updateColumns}, dateStatusChanged = '${dateStatusChanged}'  WHERE id = ${updateReq.id}`;
		await query(sql);
	} catch (err) {
		throw new Error(`Failed to update node : ${err}`);
	}
}

export async function deleteNode(id) {
	try {
		const sql = `DELETE FROM nodes WHERE id = ${id}`;
		await query(sql);
	} catch (err) {
		throw new Error(`Failed to delete node ${id} : ${err}`);
	}
}
