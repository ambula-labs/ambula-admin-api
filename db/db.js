import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
	host: "localhost",
	user: "root",
	database: "ambuladb",
});

const query = promisify(pool.query).bind(pool);

export default query;
