import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_SOURCE = path.join(__dirname, "data/gourmet2go.sqlite");
const TEMP_DB = "/tmp/gourmet2go.sqlite";

// Ensure the source database exists before copying
if (fs.existsSync(DB_SOURCE)) {
    if (!fs.existsSync(TEMP_DB)) {
        fs.copyFileSync(DB_SOURCE, TEMP_DB);
        console.log("Copied SQLite database to /tmp/");
    }
} else {
    console.error("Database source file not found:", DB_SOURCE);
    throw new Error("SQLite database source file missing.");
}

// Open the SQLite database from the temporary directory
const db = new sqlite3.Database(TEMP_DB, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error opening SQLite database:", err.message);
        throw new Error("Unable to connect to SQLite database.");
    }
    console.log("Connected to SQLite database in /tmp/");
});

// Netlify Function Handler
export const handler = async () => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM items LIMIT 1", [], (err, row) => {
            if (err) {
                console.error("Database query error:", err.message);
                return reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: err.message }),
                });
            }
            return resolve({
                statusCode: 200,
                body: JSON.stringify(row || { message: "No data found" }),
            });
        });
    });
};

