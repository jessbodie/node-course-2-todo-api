// Responsible for routes

const express = require('express');
const bodyParser = require('body-parser');

// Require Moongoose, using object destructuring
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app = express();

app.use(bodyParser.json());

// Resource creation
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            // Send back an object instead of an array to allow greater flexibility
            todos: todos
        });
    }, (e) => {
        res.status(400).send(e);
    })
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {app};