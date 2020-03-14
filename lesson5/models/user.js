const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role   : {
        type    : String,
        required: true
    },
    source : {
        type    : String,
        required: false,
        default : "admin"
    },
    granted: {
        type    : String,
        required: true
    }
});
const UserSchema = new Schema({
    name   : {
        type    : String,
        required: true
    },
    address: {
        type    : String,
        required: false,
        default : "Kyiv"
    },
    roles  : [RoleSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;