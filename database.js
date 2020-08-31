const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DB_SOURCE = 'db.profile.sqlite';
const DB_SOURCE_TEST = 'db.test.profile.sqlite';

let dbSource = DB_SOURCE;
if (process.env.NODE_ENV === 'test') {
    dbSource = DB_SOURCE_TEST;
}

let db = new sqlite3.Database(dbSource, (error) => {
    if (error) {
        console.error(error);
        throw error;
    }

    console.info('Connected to SQLite database');

    db.run(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        gender TEXT,
        bio TEXT,
        age INTEGER UNSIGNED
    )`,
    (error) => {
        // db already exists
        // let insert = 'INSERT INTO profile (firstname, lastname, gender, bio, age) VALUES (?,?,?,?,?)';
        // db.run(insert, ['Hans', 'Peter', 'male', 'biography text', 44]);
    });
});


module.exports = db