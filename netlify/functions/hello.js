import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from 'url';

// Resolve the directory name for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve the path to the SQLite file in the 'data' folder
const dbPath = path.resolve(__dirname, "../../data/gourmet2go.sqlite");

// Log the resolved path for debugging
console.log("Resolved database path:", dbPath);

// Connect to the existing SQLite database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Error opening SQLite database:", err.message);
        throw new Error("Unable to connect to SQLite database.");
    }
    console.log("Connected to SQLite database: gourmet2go.sqlite");
});

// Example handler function to query the database
const handler = async (event) => {
    return new Promise((resolve, reject) => {
        try {
            // Query: Retrieve the first item with name 'Test Item'
            const query = "SELECT * FROM items WHERE name = ? LIMIT 1";
            const params = ['Test Item'];

            db.get(query, params, (err, row) => {
                if (err) {
                    console.error("Database query error:", err.message);
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ error: err.message }),
                    });
                }

                // Return the query result as a response
                return resolve({
                    statusCode: 200,
                    body: JSON.stringify(row), // Assuming row contains the result
                });
            });
        } catch (error) {
            console.error("Error:", error);
            return reject({
                statusCode: 500,
                body: JSON.stringify({ error: error.toString() }),
            });
        }
    });
};

// Export the handler function for deployment (e.g., to Netlify or AWS Lambda)
export { handler };