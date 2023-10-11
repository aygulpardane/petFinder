// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

// define the PORT
const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + "/public/index.html");
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
// Call app.get with the API parameter '/api/v1/pets' as the first argument, and (res, req) as the second argument
// Inside the function, send a response 'pets'
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets);
});

// get pet by owner with query string
// Call app.get with the API parameter '/api/v1/pets/owner' as the first argument, and (res, req) as the second argument
// Get the owner from the request as a parameter using query
// Inside the function, send a response 'pet'
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const { owner } = req.query;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    res.send("Owner is set to " + pet.owner);
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const { name } = req.params;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send("Pet name is " + pet.name);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
