const mongoose = require("mongoose");

const UserLoginSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true, trim: true, minlength: 3},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user"}
})

module.exports = mongoose.model("UserLogin", UserLoginSchema)