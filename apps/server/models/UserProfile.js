const mongoose = require("mongoose");

const UserProfileSchema = mongoose.Schema({
    loginInfo: {type: mongoose.Schema.Types.ObjectId, ref: "UserLogin"},
    mobile: {type: String, required: true},
    ic: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    sex: {type: String, required: true},
    medAllergies: {type: String, required: true},
    pastIllnesses: {type: String, required: true}
})

module.exports = mongoose.model("UserProfile", UserProfileSchema)