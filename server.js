const express = require('express');

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

// Register other API endpoints here

// Default response for other requests - error 404
app.use((request, response) => {
    response.status(404);
});
