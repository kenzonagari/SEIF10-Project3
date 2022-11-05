const mongoose = require("mongoose");

const ApptSummarySchema = mongoose.Schema({
    
    date: {type: Date, required: true},
    time: {type: String, required: true},
    purpose: {type: String, required: true},
    summary: {type: String, required: true},
    billingInfo: {type: Number, required: true},
    followUp: {type: Boolean, default: false},
    apptCompleted: {type: Boolean, default: false},
    loginInfo: {type: mongoose.Schema.Types.ObjectId, ref: "UserLogin"},
    medPrescription: {type: mongoose.Schema.Types.ObjectId, ref: "MedPrescription"},
    userProfile: {type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" }
});

module.exports = mongoose.model("ApptSummary", ApptSummarySchema);
