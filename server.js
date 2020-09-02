const express = require('express');
const db = require('./database.js');
const bodyParser = require('body-parser');
const cors = require('cors')

// Server port
const HTTP_PORT = 3000;

// Create server / express app
const app = express();

// Parse body urlencoded or as json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable CORS for all routes
app.use(cors())

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
})

// Root endpoint
app.get('/', (request, response, next) => {
    response.json({ message: 'Ok' });
});

app.get('/profile', (request, response, next) => {
    let sql = 'SELECT * FROM profile';
    let params = [];
    db.all(sql, params, (error, rows) => {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }
        response.json(rows);
    });
});

app.get('/profile/:name', (request, response, next) => {
    let sql = 'SELECT * FROM profile WHERE firstname = ?';
    let params = [request.params.name];
    db.get(sql, params, (error, row) => {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        response.json(row);
    });
});

app.post('/profile', (request, response, next) => {
    // Validation
    let errors = [];

    if (!request.body.firstname) {
        errors.push("No first name specified");
    }

    if (!request.body.lastname) {
        errors.push("No last name specified");
    }

    if (errors.length) {
        response.status(400).json({ "error": errors.join(",") });
        return;
    }

    let data = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        gender: request.body.gender,
        bio: request.body.bio,
        age: request.body.age
    };

    let sql = 'INSERT INTO profile (firstname, lastname, gender, bio, age) VALUES (?,?,?,?,?)';
    let params = [data.firstname, data.lastname, data.gender, data.bio, data.age];
    db.run(sql, params, (error, result) => {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        data.id = this.lastId

        response.json(data);
    });
});

app.patch('/profile/:id', (request, response, next) => {
    let data = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        gender: request.body.gender,
        bio: request.body.bio,
        age: request.body.age
    };

    let sql = `UPDATE profile SET
        firstname = COALESCE(?,firstname),
        lastname = COALESCE(?,lastname),
        gender = COALESCE(?,gender),
        bio = COALESCE(?,bio),
        age = COALESCE(?,age)
        WHERE id = ?`;

    let params = [data.firstname, data.lastname, data.gender, data.bio, data.age, request.params.id];

    db.run(sql, params, (error, result) => {
        if (error) {
            response.status(400).json({ message: error.message });
            return;
        }

        response.json({ "message": "updated" });
    });
});

app.delete('/profile/:id', (request, response, next) => {
    let sql = 'DELETE FROM profile WHERE id = ?';

    db.run(sql, [request.params.id], (error, row) => {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        response.json({ "message": "deleted" })
    });
});

// Default response for other requests - error 404
app.use((request, response) => {
    response.status(404);
});

module.exports = app;