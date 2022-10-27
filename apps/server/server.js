//* EXPRESS + Cors
const express = require("express");
const cors = require ("cors");
const app = express();

//* dotenv
require('dotenv').config();

//* Mongoose dependencies
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const db = mongoose.connection;

const port = process.env.PORT ?? 3000;

//* bcrypt dependencies
const bcrypt = require("bcrypt");
const saltRounds = 10;

//* models
const UserLogin = require("./models/UserLogin")
const UserProfile = require("./models/UserProfile")
const ApptSummary = require("./models/ApptSummary")
const MedPrescription = require("./models/MedPrescription")


//* MIDDLEWARE
app.use(cors());
app.use(express.json()); //this is how Express interprets body from client side

//* SEED
app.get("/api/userlogin/seed", async(req, res) => {
    await UserLogin.deleteMany({});
    const userLogin = await UserLogin.insertMany([
        {
            username: "jiayi",
            firstname: "lee",
            lastname: "lee",
            email: "jiayi@gmail.com",
            password: bcrypt.hashSync("123", saltRounds),
            role: "user"
    }]);
    res.json(userLogin)
})

app.get("/api/userprofile/seed", async(req, res) => {
    await UserProfile.deleteMany({});
    const userProfile = await UserProfile.insertMany([
        {
            loginInfo: "6358d9e079d6f26ab0fb7bd6",
            mobile: "95558555",
            ic: "S2345675F",
            dateOfBirth: "2022/12/15",
            sex: "F",
            medAllergies: "NA",
            pastIllnesses: "NA"
    }]);
    res.json(userProfile)
})

app.get("/api/apptsummary/seed", async(req, res)=> {
    await ApptSummary.deleteMany({})
    const apptSummary = await ApptSummary.insertMany([{
        loginInfo: "6358d9e079d6f26ab0fb7bd6",
        date: "1990/12/05",
        time: "10.00",
        purpose: "General Check-Up",
        summary: "Vaccination",
        prescriptionInfo: "NA",
        billingInfo: 50
    }])
})

app.get("/api/medprescription/seed", async(req, res) => {
    await MedPrescription.deleteMany({})
    const medPrescription = await MedPrescription.insertMany([{
        loginInfo: "6358d9e079d6f26ab0fb7bd6",
        startDate: "2022/12/15",
        duration: "5 days",
        medicine: "panadol",
        dosage: "2 times per day",
        interval: "1 week",
        instruction: "after meal"
    }])
})

//* ROUTES

// CREATE
//signup
app.post('/api/signup', async(req, res) => {
    if (req.body.username === " ") {
        res.status(400).json({msg: "No name"});
        return;
    } 
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(saltRounds));
    try {

        const signup = await UserLogin.create(req.body)
        res.status(200).json(signup)
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
})

//create user profile
app.post('/api/createProfile', async(req, res)=> {
    try {
        const createprofile = await UserProfile.create(req.body)
        res.status(200).json(createprofile)
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
})

//create appointment date/time
app.post("/api/book-appointment", async(req, res) => {

})

// READ
//read user profile
app.get('/api/createProfile', async(req, res) => {
    try {
        const users = await UserProfile.find().exec()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error})
    }
    })

// read health profile
app.get('/api/healthProfile', async (req, res)=> {
    try {
        const users = await ApptSummary.find().exec() //need google
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error})
    }
})

// UPDATE
app.put("/api/home/:id", async(req, res)=> {
const {id} = req.params
try {
    const updateuser = await UserProfile.findByIdAndUpdate(id);
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



//---------------------
//* Connect to Mongo
mongoose.connect(MONGO_URI, () => {
    console.log("the connection with mongod is established");
});

// Connection Error/Success
//* Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => {
    app.listen(port, ()=>{
        console.log("listening on port", port);
    });
    console.log("mongo connected: ", MONGO_URI);
});
db.on("disconnected", () => console.log("mongo disconnected"));