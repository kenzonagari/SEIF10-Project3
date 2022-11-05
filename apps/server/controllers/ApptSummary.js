//* Mongoose dependencies
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const ApptSummary = require("../models/ApptSummary.js");
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);
const isAuth = require("../middlewares/isAuth.js");
const isAuthAdmin = require("../middlewares/isAuthAdmin.js");

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
router.get("/seed", async(req, res)=> {
   // await ApptSummary.deleteMany({})
    const apptsummary = await ApptSummary.insertMany([{
        loginInfo: "6358d9e079d6f26ab0fb7bd6",
        date: "1990/12/05",
        time: "10.00",
        purpose: "General Check-Up",
        summary: "Vaccination",
        prescriptionInfo: "NA",
        billingInfo: 50
    }]);
    res.json(apptsummary);
})

// ROUTES
// CREATE
router.post('/', isAuth, async(req, res)=> {
    const {purpose, date, time} = req.body;
    console.log(req.body, req.session.user._id);
    try {
        const createAppt = await ApptSummary.create({
            loginInfo: req.session.user._id,
            date: date,
            time: time,
            purpose: purpose,
            summary: "NA",
            prescriptionInfo: "NA",
            billingInfo: 0
        });
        res.status(200).json({msg: "Booking successful"});
    } catch (error) {
        res.status(500).json({msg: "Server error"});
    }
})

// READ

router.get('/', async (req, res)=> {
    try {
        const users = await ApptSummary.find().exec() //need google
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error})
    }
})


// Update
router.put('/:id', async(req, res)=> {
    const {id} = req.params
    try {
        const updateuser = await ApptSummary.findByIdAndUpdate(id);
        if (updateuser === null) {
            res.status(400).json({msg: "Wrong ID"})
        } else {
            res.status(204).json(updateuser)
        }
    
    } catch (error){
        res.status(500).json({msg: error})
    }
    })

// DELETE
    router.delete('/:id', async(req, res)=> {
        const {id} = req.params
        try {
            const deleteuser = await ApptSummary.findByIdAndDelete(id);
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
