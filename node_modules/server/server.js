//* EXPRESS + Cors
const express = require("express");
const cors = require ("cors");
const app = express();
const path = require("path");

//* dotenv
require("dotenv").config();

//* Mongoose dependencies
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const db = mongoose.connection;

const port = process.env.PORT ?? 3000;

//* bcrypt dependencies
const bcrypt = require("bcrypt");
const saltRounds = 10;


//* MIDDLEWARE
app.use(express.static("../client/dist"))
app.use(cors());
app.use(express.json()); //this is how Express interprets body from client side
app.use(express.static("../client/dist"));


//* CONTROLLERS
const UserLogin = require('./controllers/UserLogin.js'); 
app.use('/api/userlogin', UserLogin);
const UserProfile = require('./controllers/UserProfile.js'); 
app.use('/api/userprofile', UserProfile);
const ApptSummary = require('./controllers/ApptSummary.js'); 
app.use('/api/apptsummary', ApptSummary);
const MedPrescription = require('./controllers/MedPrescription.js'); 
app.use('/api/medprescription', MedPrescription);
// CREATE
// READ
// UPDATE
// DELETE


// for react router to work
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("../client/dist/index.html"));
  });

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