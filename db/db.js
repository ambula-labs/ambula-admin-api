import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	database: "ambuladb",
	authPlugins: {
		mysql_clear_password: () => () => Buffer.from(""),
		mysql_native_password: require("mysql/lib/auth_plugins/mysql_native_password"),
	},
});

const query = promisify(pool.query).bind(pool);

export default query;
