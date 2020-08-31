const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DB_SOURCE = 'db.profile.sqlite';

let db = new sqlite3.Database(DB_SOURCE, (error) => {
    if (error) {
        console.error(error);
        throw error;
    }

    console.info('Connected to SQLite database');

    db.run(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        age INTEGER UNSIGNED
    )`,
    (error) => {
        // db already exists
        // let insert = 'INSERT INTO profile (firstname, lastname, age) VALUES (?,?,?)';
        // db.run(insert, ['Hans', 'Peter', 44]);
    });
});


module.exports = db