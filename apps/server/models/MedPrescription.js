const mongoose = require("mongoose");

const MedPrescriptionSchema = mongoose.Schema({
    loginInfo: {type: mongoose.Schema.Types.ObjectId, ref: "UserLogin"},
    startDate: {type: Date, required: true},
    duration: {type: String, required: true},
    medicine: {type: String, required: true},
    dosage: {type: String, required: true},
    interval: {type: String, required: true},
    instruction: {type: String, required: true}
});

module.exports = mongoose.model("MedPrescription", MedPrescriptionSchema);
