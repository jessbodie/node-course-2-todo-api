var mongoose = require('mongoose');

// Because Promises not originally part of  JS, need to specify
mongoose.Promise = global.Promise;
// Similar to MongoClient.connect
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};
