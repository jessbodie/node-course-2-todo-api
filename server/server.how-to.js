var mongoose = require('mongoose');

// Because Promises not originally part of  JS, need to specify
mongoose.Promise = global.Promise;
// Similar to MongoClient.connect
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Create a model (Mongoose requires)
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo: ', doc);
// }, (e) => {
//     console.log('unable to save todo', e);
// });

// var nextTodo = new Todo({
//     text: 'Eat lunch',
//     completed: false,
//     completedAt: Date.now()
// });

// var nextTodo = new Todo({
//     text: true
// });

// nextTodo.save().then((doc) => {
//     console.log('saved todo:', doc);
// }, (e) => {
//     console.log('unable to save', e);
// });

// Model for user
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var xUser = new User({
    email: '  boy@jess.com '
});

xUser.save().then((u) => {
    console.log('saved new user:', u);
}, (e) => {
    console.log('Unable to save user', e);
});