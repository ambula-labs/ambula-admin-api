import query from "../db/db.js";
import fromDatabaseResult from "./Factories/ChainInfosFactory.js";

export default async function getChainInfos() {
	try {
		const sql = "SELECT * FROM chain_infos WHERE id=1";
		const rows = await query(sql);

		return fromDatabaseResult(rows[0]);
	} catch (err) {
		throw new Error(`Failed to fetch chain_infos from the database: ${err}`);
	}
}

export async function updateChainInfos(updateReq) {
	try {
		const currentDate = updateReq.date.toISOString().slice(0, 19).replace("T", " ");
		const sql = `UPDATE chain_infos SET status = ${updateReq.status}, dateStatusChanged = '${currentDate}' WHERE id = 1`;
		await query(sql);
	} catch (err) {
		throw new Error(`Failed to update chain_infos from the database: ${err}`);
	}
}
