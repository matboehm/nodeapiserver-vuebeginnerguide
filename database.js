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

    const createTableSql = `CREATE TABLE profile (
        id INTEGER PRIMARY KEY ${process.env.NODE_ENV === 'test' ? 'AUTOINCREMENT' : ''},
        firstname TEXT,
        lastname TEXT,
        gender TEXT,
        bio TEXT,
        age INTEGER UNSIGNED
    )`

    db.run(createTableSql,
    (error) => {
        // db already exists

        // set up test db
        if (process.env.NODE_ENV === 'test') {
            let cleanup = 'DELETE FROM profile';
            db.run(cleanup);
            let insert = 'INSERT INTO profile (id, firstname, lastname, gender, bio, age) VALUES (?,?,?,?,?,?)';
            db.run(insert, [1, 'Hans Peter', 'Baxxter', 'male', 'biography text', 44]);
            db.run(insert, [2, 'Dieter', 'Bohlen', 'male', 'biography text', 63]);
        }
    });
});


module.exports = db