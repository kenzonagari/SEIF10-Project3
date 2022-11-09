//* Mongoose dependencies
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const MedPrescription = require("../models/MedPrescription.js");
const isAuthAdmin = require("../middlewares/isAuthAdmin.js");
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);

const store = new MongodbSession({
    uri: MONGO_URI,
    collection: "mySessions"
});

router.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: store
}));

//* SEED
router.get("/seed", async(req, res) => {
    //await MedPrescription.deleteMany({})
    const medprescription = await MedPrescription.insertMany([{
    loginInfo: "6358d9e079d6f26ab0fb7bd6",
    startDate: "2022/12/15",
    duration: "5 days",
    medicine: "panadol",
    dosage: "2 times per day",
    interval: "1 week",
    instruction: "after meal"
    }])
    res.json(medprescription)
})

//* testing
router.get("/test", async(req, res) => {
    //await MedPrescription.deleteMany({})
    const medprescription = await MedPrescription.insertMany([{
    startDate: "2022/12/01",
    duration: "5 days",
    medicine: "panadols",
    dosage: "2 times per day",
    instruction: "after meal"
    }])
    res.json(medprescription)
})

router.get("/test2", async(req, res) => {
    //await MedPrescription.deleteMany({})
    const medprescription = await MedPrescription.insertMany([{
        medprescription: "636465644769e65dd2d045e1",
        startDate: "2022/12/02",
    duration: "10 days",
    medicine: "panadols",
    dosage: "2 times per day",
    instruction: "after meal"
    }])
    res.json(medprescription)
})

// ROUTES
// CREATE (for admin)
router.post('/admin', isAuthAdmin, async(req, res)=> { 
    const {medicine, dosage, startDate, duration, instruction} = req.body;
    try {
        const createMedPrescripton = await MedPrescription.create({
            medicine: medicine,
            dosage: dosage,
            startDate: startDate,
            duration: duration,
            instruction: instruction
        });
        res.status(200).json(createMedPrescripton);
    } catch (error) {
        res.status(500).json({msg: "Server Error"});
    }
})

// READ

router.get('/', async (req, res)=> {
    try {
        const users = await MedPrescription.find().exec() //need google
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error});
    }
});

// UPDATE
router.put('/:id', isAuthAdmin, async(req, res)=> {
    const { id } = req.params;
    const {medicine, dosage, startDate, duration, instruction} = req.body;
    try {

        const updateMedPrescription = await MedPrescription.findByIdAndUpdate(id, {
            medicine: medicine,
            dosage: dosage,
            startDate: startDate,
            duration: duration,
            instruction: instruction
        });
        if (updateMedPrescription === null) {
            res.status(400).json({msg: "Wrong ID"});

        } else {
            res.status(200).json(updateMedPrescription);
        }
    
    } catch (error){
        res.status(500).json({msg: error})
    }
});

// DELETE
    router.delete('/:id', async(req, res)=> {
        const {id} = req.params
        try {
            const deleteuser = await MedPrescription.findByIdAndDelete(id);
            if (updateuser === null) {
                res.status(400).json({msg: "Wrong ID"})
            } else {
                res.status(204).json(deleteuser)
            }
        
        } catch (error){
            res.status(500).json({msg: error})
        }
        })
    
// EXPORT
module.exports = router;
