// Responsible for routes

const express = require('express');
const bodyParser = require('body-parser');

// Require Moongoose, using object destructuring
const {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

app.listen(3000, () => {
    console.log('Started on port 3000');
});
