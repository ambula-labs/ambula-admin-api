import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	database: "ambuladb",
});

const query = promisify(pool.query).bind(pool);

export default query;
