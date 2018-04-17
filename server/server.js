// Responsible for routes 
// create doc, get doc, delete doc routes

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Require Moongoose, using object destructuring
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app = express();
const port = process.env.PORT || 3000;

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
    });
});

// GET /todos/1234ID1234
// Pattern for URL parameter is :xx on request object
// This creates id variable
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
            return;
        }
        res.send({todo: todo});
    }, (e) => {
        res.status(400).send();
    });
});


// DELETE /todos/1234ID1234
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    // Check if valid ID
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Remove by ID
    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            res.status(200).send({todo: todo});
            return;
        } else {
        return res.status(404).send();          
        }
    }).catch((e) => {        
        res.status(400).send();
    });
});


// PATCH - to update a resource
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // _.pick is lodash utility to pick off select properties
    // first param: object, 2nd param: array of properties to pick off
    var body = _.pick(req.body, ['text', 'completed']);

    // Check if valid ID
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    // If body.completed seet to true
    if (_.isBoolean(body.completed) && body.completed) {
        // Returns number of milliseconds since Jan 1 1970
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        console.log(todo);
        if (!todo) {
            console.log('no todo', todo);
            return res.status(404).send();
        } 
        res.send({todo: todo});
    }).catch((e) => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = {app};