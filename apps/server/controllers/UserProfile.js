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

//* testing
router.get("/test", async(req, res) => {
    try {
        const alldata = await UserProfile.find().populate("loginInfo")
        res.status(200).json(alldata)
    } catch (error) {
        res.status(500).json({ msg: error });
      } 
 })


// ROUTES
// CREATE
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

// router.post('/logout', (req, res)=> {
//     req.session.destroy((err)=> {
//         if(err) throw err;
//         res.json({msg: "Logged Out!"})
//     })
// })

// READ
// user read user profile
router.get('/', isAuth, async(req, res) => {
    try {
        const userProfileInfo = await UserProfile.find({ "loginInfo" : req.session.user._id }).populate("loginInfo");
        res.status(200).json(userProfileInfo);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});


// Update
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
router.put('/admin/:id', isAuthAdmin, async(req, res) => {
    const {id} = req.params
    try {
        const adminupdate = await UserProfile.findByIdAndUpdate(id);
        if (adminupdate === null) {
            res.status(400).json({msg: "Wrong ID"})
        } else {
          
            res.status(204).json(adminupdate)
          
        }
    } catch (error) {
        res.status(500).json({msg: error})
    }
})

// DELETE
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
