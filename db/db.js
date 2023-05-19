import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
	host: "127.0.0.1",
	port: 3306,
	user: "ambula_user",
	password: "Ambula@123!",
	database: "ambuladb",
});

const query = async (sql) => {
	try {
		const result = await promisify(pool.query).call(pool, sql);
		return result;
	} catch (err) {
		console.error("Failed to fetch activities from the database:", err);
		throw err;
	}
};

// Function to gracefully close the pool
function closePool() {
	pool.end((err) => {
		if (err) {
			console.error("Error closing the database connection pool:", err);
		} else {
			console.log("Database connection pool closed.");
		}
	});
}

// Handle the exit event
process.on("exit", () => {
	// Close the database pool
	closePool();
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
	console.error("Unhandled Promise rejection:", err);
});

export default query;
