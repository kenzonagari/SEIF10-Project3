//* Mongoose dependencies
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile.js");
const UserLogin = require('../models/UserLogin.js'); 
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
router.get("/seed", async(req, res) => {
   // await UserProfile.deleteMany({});
    const userprofile = await UserProfile.insertMany([
        {
            mobile: "95558555",
            ic: "S2345675F",
            dateOfBirth: "2022/12/20",
            sex: "F",
            medAllergies: "NA",
            pastIllnesses: "NA",
            loginInfo: "6361f7ff07e2ef96c36a06f9"
    }]);
    res.json(userprofile)
})




// ROUTES
//* CREATE
// user create profile
router.post('/', isAuth, async(req, res)=> {
    req.body.loginInfo = req.session.user._id;
    console.log(req.body);
    try {
        const createUserProfile = await UserProfile.create(req.body);
        res.status(200).json({msg: "Redirecting to /home"});
    } catch (error) {
        res.status(500).json({msg: "server error"});
    }
});

//* READ
// user read user profile
router.get('/', isAuth, async(req, res) => {
    try {
        const userProfileInfo = await UserProfile.find({ "loginInfo" : req.session.user._id }).populate("loginInfo");
        res.status(200).json(userProfileInfo);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

//  healthprofile (user can read medications, appt summary & billing)
router.get("/test", async(req, res) => {
    try {
        const alldata = await UserProfile.find({}).populate(["medPrescription", "apptSummary"])
        
        res.status(200).json(alldata)
    } catch (error) {
        res.status(500).json({ msg: error });
        } 
    })

//admin read user profile
router.get('/admin/:id', isAuthAdmin, async(req, res) => { //need isAuthAdmin
    const { id } = req.params;
    try {
        const adminUserProfileRead = await UserProfile.findById(id).populate(["loginInfo"]);
        if (adminUserProfileRead === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
            res.status(200).json(adminUserProfileRead); //OK
        }
    } catch (error) {
        res.status(500).json({msg: error});
    }
})

//* UPDATE
// user update user profile
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

// admin update user profile
router.put('/admin/:id', isAuthAdmin, async(req, res) => { //need isAuthAdmin
    const { id } = req.params;
    const {dateOfBirth, sex, mobile, ic, medAllergies, pastIllnesses} = req.body;

    try {
        const userProfileUpdate = await UserProfile.findByIdAndUpdate(id, {
            dateOfBirth: dateOfBirth,
            sex: sex,
            mobile: mobile,
            ic: ic,
            medAllergies: medAllergies,
            pastIllnesses: pastIllnesses
        });

        if (userProfileUpdate === null) {
            res.status(400).json({msg: "Wrong ID"});
        } else {
            res.status(200).json({msg: "Redirecting to /admin/home"});
        }
    } catch (error) {
        res.status(500).json({msg: "input error"})
    }
})

//* DELETE
// only admin can delete user profile
router.delete('/admin/:id', isAuthAdmin, async(req, res)=> {
    const {id} = req.params
    try {
        const deleteuser = await UserProfile.findByIdAndDelete(id);
        if (updateuser === null) {
            res.status(400).json({msg: "Wrond ID"})
        } else {
            res.status(204).json(deleteuser)
        }
    
    } catch (error){
        res.status(500).json({msg: error})
    }
})


// EXPORT
module.exports = router;
