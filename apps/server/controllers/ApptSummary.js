//* Mongoose dependencies
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const ApptSummary = require("../models/ApptSummary.js");
const UserProfile = require("../models/UserProfile.js");
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
        billingInfo: 50,
        
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

 // admin can read selected user's everything
 router.get("/test2/:id", async(req, res) => {
    try {
        const alldata = await ApptSummary.find({ "loginInfo" : req.session._id }).populate(["loginInfo", "medPrescription"])
        if (alldata === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
            res.status(200).json(alldata)
        }  
        
    } catch (error) {
        res.status(500).json({ msg: error });
      } 
 })

 //  admin can read all user's everything
 router.get("/test2", async(req, res) => {
    try {
        const alldata = await ApptSummary.find({}).populate(["loginInfo", "medPrescription"])
        if (alldata === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
        res.status(200).json(alldata)
        }
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
        res.status(500).json({msg: error});
    }
});

// check is the date available if yes -> can book
router.get("/checkdate", isAuth, async(req, res) => {
    try {
        const checkdate = await ApptSummary.find({}, {date:1, time:1})
        if (checkdate === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
        res.status(200).json(checkdate)
        }
    } catch (error) {
        res.status(500).json({ msg: error });
      } 
 })

// READ
router.get('/', isAuth, async (req, res)=> {
    try {

        const userApptHistory = await ApptSummary.find({ loginInfo: req.session.user._id }).exec();
        if (userApptHistory === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {

       
        res.status(200).json(userApptHistory);
        }
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//Read all
router.get('/all', isAuthAdmin, async (req, res)=> {
    try {
        const userApptHistory = await ApptSummary.find({}).populate(["loginInfo", "medPrescription"]);
        if (userApptHistory === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
        res.status(200).json(userApptHistory);
        }
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//Read one (for admin)
router.get('/:id', isAuthAdmin, async (req, res)=> {
    const {id} = req.params;
    try {
        const userApptHistory = await ApptSummary.findById(id).populate(["loginInfo", "medPrescription"]);
        const userProfile = await UserProfile.find({ loginInfo: userApptHistory.loginInfo._id }).populate(["loginInfo"]);
        if (userApptHistory === null || userProfile === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
        res.status(200).json({userApptHistory, userProfile});
        }
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

// Update
router.put('/:id', isAuthAdmin, async(req, res)=> {
    const {id} = req.params;
    const {purpose, billingInfo, summary, followUp, medPrescription} = req.body;
    try {
        const updateApptHistory = await ApptSummary.findByIdAndUpdate(id, {
            purpose: purpose,
            summary: summary,
            billingInfo: billingInfo,
            followUp: followUp,
            medPrescription: medPrescription,
            apptCompleted: true
        });
        if (updateApptHistory === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
            res.status(200).json({msg: "Update successful"});
        }
    } catch (error){
        res.status(500).json({msg: error});
    }
    })

// user update profile
router.put('/:id', isAuth, async(req, res)=> {
    const { id } = req.params;
    const { email, mobile } = req.body;

    try {
        const updateUserProfile = await UserProfile.findByIdAndUpdate(id, {
            mobile: mobile
        });
        const updateUserLogin = await UserLogin.findByIdAndUpdate(req.session.user._id, {
            email: email
        });

        if (updateUserProfile === null || updateUserLogin === null) {
            res.status(400).json({msg: "User ID Not Found"}); //Bad Request
        } else {
            res.status(200).json(updateUserProfile); //OK
        }
    } catch (error){
        res.status(500).json({ msg: "server error" });
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
