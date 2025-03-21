import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_SOURCE = path.join(__dirname, "data/gourmet2go.sqlite");
const TEMP_DB = "/tmp/gourmet2go.sqlite";

// Copy DB to /tmp/ if it doesn't exist (to allow write operations)
if (!fs.existsSync(TEMP_DB)) {
    fs.copyFileSync(DB_SOURCE, TEMP_DB);
}

const db = new sqlite3.Database(TEMP_DB, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error opening SQLite database:", err.message);
        throw new Error("Unable to connect to SQLite database.");
    }
    console.log("Connected to SQLite database in /tmp/");
});

export const handler = async () => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM items LIMIT 1", [], (err, row) => {
            if (err) {
                return reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: err.message }),
                });
            }
            return resolve({
                statusCode: 200,
                body: JSON.stringify(row),
            });
        });
    });
};
