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
        loginInfo: "63645caec6c9e5bada7368a2",
        medPrescription: "636465644769e65dd2d045e1",
        date: "1990/12/05",
        time: "10.00",
        purpose: "Follow-Up",
        summary: "Vaccination",
        billingInfo: 50
    }]);
    res.json(apptsummary)
        
})

//* testing
router.get("/test", async(req, res)=> {
    // await ApptSummary.deleteMany({})
    const apptsummary = await ApptSummary.insertMany([{
        date: "1990/12/15",
        time: "9.00",
        purpose: "General Check-Up",
        summary: "Vaccination",
        billingInfo: 50
    }])
    res.json(apptsummary)
 })

 //  /admin/:id (admin can read all)
 router.get("/test2", async(req, res) => {
    try {
        const alldata = await ApptSummary.find({}).populate(["loginInfo", "medPrescription"])
      
        res.status(200).json(alldata)
    } catch (error) {
        res.status(500).json({ msg: error });
      } 
 });

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
            billingInfo: 0
        });
        res.status(200).json({msg: "Booking successful"});
    } catch (error) {
        res.status(500).json({msg: "Server error"});
    }
});

// check is the date available if yes -> can book, if no -> another date
router.get("/checkdate", async(req, res) => {
    try {
        const checkdate = await ApptSummary.find({}, {date:1, time:1})
      console.log(checkdate)
        res.status(200).json(checkdate)
    } catch (error) {
        res.status(500).json({ msg: error });
      } 
 })

// READ
router.get('/', isAuth, async (req, res)=> {
    try {
        const userApptHistory = await ApptSummary.find({ loginInfo: req.session.user._id }).exec();
        res.status(200).json(userApptHistory);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//Read all
router.get('/all', async (req, res)=> { //need isAuthAdmin later
    try {
        const userApptHistory = await ApptSummary.find({}).populate(["loginInfo", "medPrescription"]);
        res.status(200).json(userApptHistory);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

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
