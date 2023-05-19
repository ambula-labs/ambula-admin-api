import query from "../db/db.js";
import fromDatabaseResult from "./Factories/ChainInfosFactory.js";

export default async function getChainInfos() {
	try {
		const sql = "SELECT * FROM chain_infos WHERE id=1";
		const rows = await query(sql);

		return fromDatabaseResult(rows);
	} catch (err) {
		throw new Error(`Failed to fetch chain_infos from the database: ${err}`);
	}
}
