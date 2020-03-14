const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLoginSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: "default@email.com"
    }
});
const UserLogin = mongoose.model('userlogin', UserLoginSchema);

module.exports = UserLogin;