var mongoose = require('mongoose');

// Because Promises not originally part of  JS, need to specify
mongoose.Promise = global.Promise;
// Similar to MongoClient.connect
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose: mongoose
};


// // Heroku
// process.env.NODE_ENV === 'production'
// // Local testing
// process.env.NODE_ENV ==='development'
// // Run test suite through Mocha
// process.env.NODE_ENV ==='test'
// Will be used to update MONGODB_URI var above
