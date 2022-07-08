const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    name: String,
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = {
    UserModel,
};