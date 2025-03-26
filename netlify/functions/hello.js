import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the absolute path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct database path based on your structure
const DB_SOURCE = path.join(__dirname, "data", "gourmet2go.sqlite");    
const TEMP_DB = "/tmp/gourmet2go.sqlite";

// Debugging: Check if the database file exists
console.log("Checking for database file:", DB_SOURCE);
console.log("Files in function directory:", fs.readdirSync(path.join(__dirname, "data")));

// Ensure the source database exists before copying
if (fs.existsSync(DB_SOURCE)) {
    if (!fs.existsSync(TEMP_DB)) {
        fs.copyFileSync(DB_SOURCE, TEMP_DB);
        console.log("✅ Copied SQLite database to /tmp/");
    }
} else {
    console.error("❌ ERROR: Database source file not found:", DB_SOURCE);
    throw new Error("SQLite database source file missing.");
}

// Open the SQLite database from the temporary directory
const db = new sqlite3.Database(TEMP_DB, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("❌ ERROR: Unable to open SQLite database:", err.message);
        throw new Error("Unable to connect to SQLite database.");
    }
    console.log("✅ Connected to SQLite database in /tmp/");
});

// Netlify Function Handler
export const handler = async () => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM items LIMIT 1", [], (err, row) => {
            if (err) {
                console.error("❌ ERROR: Database query failed:", err.message);
                return reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: "Database query failed: " + err.message }),
                });
            }
            return resolve({
                statusCode: 200,
                body: JSON.stringify(row || { message: "No data found" }),
            });
        });
    });
};
