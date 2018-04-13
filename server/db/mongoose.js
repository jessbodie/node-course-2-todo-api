var mongoose = require('mongoose');

// Because Promises not originally part of  JS, need to specify
mongoose.Promise = global.Promise;
// Similar to MongoClient.connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};
