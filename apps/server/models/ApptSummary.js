const mongoose = require("mongoose");

const ApptSummarySchema = mongoose.Schema({
    loginInfo: {type: mongoose.Schema.Types.ObjectId, ref: "UserLogin"},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    purpose: {type: String, required: true},
    summary: {type: String, required: true},
    prescriptionInfo: {type: String, required: true},
    billingInfo: {type: Number, required: true}
});

module.exports = mongoose.model("ApptSummary", ApptSummarySchema);
