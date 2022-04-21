"use strict"

import Database from 'better-sqlite3';

const db = new Database('log.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`
    );
// Define row using `get()` from better-sqlite3
let row = stmt.get();
// Check if there is a table
if (row === undefined) { // DB doesn't yet exist
    console.log('Your database appears to be empty. I will initialize it now.');

    // Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE accesslog ( id INTEGER PRIMARY KEY, remoteaddr TEXT, remoteuser TEXT, time DATE, method TEXT, url TEXT, protocol TEXT, httpversion TEXT, status TEXT, referer TEXT, useragent TEXT );
    `;

    // Execute the above SQL command
    db.exec(sqlInit);
    console.log('Your database has been initialized with a new accesslog table.');
} else { // DB already exists
    console.log('Database exists.')
}

// Export all of the above as a module so that we can use it elsewhere.
export default db;
