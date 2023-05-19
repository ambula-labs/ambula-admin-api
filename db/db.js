import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
	host: "192.168.0.100",
	port: 3306,
	user: "ambula_user",
	password: "Ambula@123!",
	database: "ambuladb",
});

const query = promisify(pool.query).bind(pool);

export default query;
