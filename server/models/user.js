const mongoose = require('mongoose');

// Model for user
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {
    User: User
};
