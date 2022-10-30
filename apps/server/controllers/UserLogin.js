
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
const session = require("express-session")
const MongodbSession = require("connect-mongodb-session")(session)

//* MIDDLEWARE

const store = new MongodbSession({
    uri: MONGO_URI,
    collection: "mySessions"
})
router.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: store
}))

//* SEED
router.get("/seed", async(req, res) => {
    await UserLogin.deleteMany({});
    const userlogin = await UserLogin.insertMany([
        {
            username: "jiayi",
            firstname: "lee",
            lastname: "lee",
            email: "jiayi@gmail.com",
            password: bcrypt.hashSync("123", saltRounds),
            confirmpassword: password,
            role: "user"
    }]);
    res.json(userlogin)
})

// ROUTES
// CREATE
//sign-up
router.post('/', async(req, res) => {
    const {firstname, lastname, username, email, password, confirmpassword} = req.body
    //conditionals - input check
    try {
    const existingUser = await UserLogin.findOne({email})
    if (existingUser) return res.status(400).json({msg: "User already exists"})
    if (username.length < 3 || firstname.length === 0 || lastname.length === 0) {
      return res.status(400).json({msg: "Length of username must be more than 3 and fill in your name!"}) }
    if (password !== confirmpassword) return res.status(400).json({msg: "Password incorrect!"})
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(saltRounds));
    
        const signup = await UserLogin.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });
        res.status(200).json(signup);
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
// sign-in
router.post('/signin', async(req, res) => {
    const { email, password} = req.body
    try {
        const user = await UserLogin.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            res.status(401).json("Email/Password not found/match!")
        }
        req.session.isAuth = true
        console.log(req.session.cookie)
         res.status(200).json("Sign in successfully!")
    } catch (error) {
        res.status(500).json({msg: error});
    }
   
})

// READ
router.get('/', async(req, res) => {
    
    try {
        const users = await UserLogin.find().exec()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({msg: error})
    }
    })

    

// Update
router.put('/:id', async(req, res)=> {
    const {id} = req.params
    try {
        const updateuser = await UserLogin.findByIdAndUpdate(id);
        if (updateuser === null) {
            res.status(400).json({msg: "Wrond ID"})
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
