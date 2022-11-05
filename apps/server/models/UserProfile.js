const mongoose = require("mongoose");

const UserProfileSchema = mongoose.Schema({
    
    mobile: {type: String, required: true},
    ic: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    sex: {type: String, required: true},
    medAllergies: {type: String, required: true},
    pastIllnesses: {type: String, required: true},
<<<<<<< HEAD
    loginInfo: {type: mongoose.Schema.Types.ObjectId, ref: "UserLogin"},
    apptSummary: {type: mongoose.Schema.Types.ObjectId, ref: "ApptSummary"},
    medPrescription: {type: mongoose.Schema.Types.ObjectId, ref: "MedPrescription"}
=======
    loginInfo: {type: mongoose.Schema.Types.ObjectId, ref: "UserLogin", unique: true},
    apptSummary: [{type: mongoose.Schema.Types.ObjectId, ref: "ApptSummary"}]
>>>>>>> main
})

module.exports = mongoose.model("UserProfile", UserProfileSchema)