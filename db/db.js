import { createConnection } from "mysql";

const connection = createConnection({
	host: "localhost",
	user: "root",
	database: "ambuladb",
});

const query = promisify(connection.query).bind(connection);

export default query;
