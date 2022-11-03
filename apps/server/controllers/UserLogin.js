//* bcrypt dependencies
const bcrypt = require("bcrypt");
const saltRounds = 10;

//* dotenv
require("dotenv").config();

//* Mongoose dependencies
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const UserLogin = require("../models/UserLogin");
const UserProfile = require("../models/UserProfile.js");
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);

//* MIDDLEWARE

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

const isAuth = require("../middlewares/isAuth");
const isAuthAdmin = require("../middlewares/isAuthAdmin");

//* SEED
router.get("/seed", async(req, res) => {
   // await UserLogin.deleteMany({});
    const userlogin = await UserLogin.insertMany([
        {
            username: "jiayi3",
            firstname: "lee",
            lastname: "lee",
            email: "jiayi3@gmail.com",
            password: bcrypt.hashSync("123", saltRounds),
            role: "user"
    }]);
    res.json(userlogin)
})

//* testing
router.get("/test", async(req, res) => {
    // await UserLogin.deleteMany({});
     const userlogin = await UserLogin.insertMany([
         {
             username: "jiayi4",
             firstname: "le",
             lastname: "le4",
             email: "jiayi4@gmail.com",
             password: bcrypt.hashSync("123", saltRounds),
             role: "user"
     }]);
     res.json(userlogin);
});

// ROUTES
// CREATE
//sign-up
router.post('/', async(req, res) => {
    const {firstname, lastname, username, email, password} = req.body;

    //conditionals - input check
    const existingUsername = await UserLogin.findOne({username});
    const existingEmail = await UserLogin.findOne({email});

    if (existingUsername) {
        return res.status(401).json({msg: "Username already taken"}); //401 - unauthorized
    }

    if (existingEmail) {
        return res.status(401).json({msg: "Email already taken"});
    }

    if (username.length < 3) {
        return res.status(401).json({msg: "Length of username must be at least 3 letters"}); 
    }

    if (firstname.length === 0 || lastname.length === 0) {
        return res.status(401).json({msg: "Please provide a full name"}); 
    }

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(saltRounds));
    
    try {
        const signup = await UserLogin.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });
        res.status(200).json({msg: "Sign up successful"});
    } catch (error) {
        res.status(500).json({msg: error});
    };
});

// user sign-in
router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserLogin.findOne({"email": email});
        if (!user) {
            user = await UserLogin.findOne({"username": email});
            if(!user){
                return res.status(401).json({msg: "Email not found"});
            }
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (passwordMatch === false) {
            return res.status(401).json({msg: "Incorrect password"});
        }
        
        req.session.isAuth = true;
        req.session.user = {
            _id: user._id,
            username: user.username,
            password: user.password
        }

        let checkUserProfile = await UserProfile.findOne({ "loginInfo": req.session.user._id });

        if(checkUserProfile){
            return res.status(200).json({msg: "Redirecting to /home"});
        } else {
            return res.status(200).json({msg: "Redirecting to /createProfile"});
        }

    } catch (error) {
        return res.status(500).json({msg: error});
    }
});

// admin sign-in
router.post('/admin/signin', async(req, res) => {
    const { email, password} = req.body
    try {
        const user = await UserLogin.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            res.status(401).json("Email/Password not found/match!")
        }
        req.session.isAuthAdmin = true
        console.log(req.session.cookie)
         res.status(200).json("Admin sign in successfully!")
    } catch (error) {
        res.status(500).json({msg: error});
    } 
});

// READ
router.get('/', isAuth, async(req, res) => {
    try {
        const userLoginInfo = await UserLogin.find({ "_id" : req.session.user._id }).exec();
        res.status(200).json(userLoginInfo);
    } catch (error) {
        res.status(500).json({msg: error});
    }
});

// Update
router.put('/:id', async(req, res)=> {
    const {id} = req.params
    try {
        const updateuser = await UserLogin.findByIdAndUpdate(id);
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
            const deleteuser = await UserLogin.findByIdAndDelete(id);
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
