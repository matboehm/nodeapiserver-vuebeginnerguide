const express = require('express');
const db = require('./database.js');

// Server port
const HTTP_PORT = 3000;

// Create server / express app
const app = express();

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
})

// Root endpoint
app.get('/', (request, response, next) => {
    response.json({message: 'Ok'});
});

app.get('/profile', (request, response, next) => {
    let sql = 'SELECT * FROM profile';
    let params = [];
    db.all(sql, params, (error, rows) => {
        if (error) {
            response.status(400).json({error: error.message});
        }

        response.json({
            message: 'success',
            data: rows
        });
    });
});

app.get('/profile/:name', (request, response, next) => {
    let sql = 'SELECT * FROM profile WHERE firstname = ?';
    let params = [request.params.name];
    db.get(sql, params, (error, row) => {
        if (error) {
            response.status(400).json({error: error.message});
        }

        response.json({
            message: 'success',
            data: row
        });
    });
});

// app.post('/profile', (request, response, next) => {
//     let sql = 'SELECT * FROM profile WHERE firstname = ?';
//     let params = [request.params.name];
//     db.get(sql, params, (error, row) => {
//         if (error) {
//             response.status(400).json({error: error.message});
//         }

//         response.json({
//             message: 'success',
//             data: row
//         });
//     });
// });

// Register other API endpoints here

// Default response for other requests - error 404
app.use((request, response) => {
    response.status(404);
});
