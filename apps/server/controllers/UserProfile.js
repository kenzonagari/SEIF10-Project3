//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile.js");
const UserLogin = require('./UserLogin.js'); 
const session = require("express-session")

// MIDDLEWARE
const isAuth = (req, res, next) => {
    if (req.session.isAuth){
        next()
    } else {
        res.json("Not Authorized!")
    }
}
//* SEED
router.get("/seed", async(req, res) => {
    await UserProfile.deleteMany({});
    const userprofile = await UserProfile.insertMany([
        {
            loginInfo: "6358d9e079d6f26ab0fb7bd6",
            mobile: "95558555",
            ic: "S2345675F",
            dateOfBirth: "2022/12/20",
            sex: "F",
            medAllergies: "NA",
            pastIllnesses: "NA"
    }]);
    res.json(userprofile)
})

// ROUTES
// CREATE

router.post('/', async(req, res)=> {
    try {
        const createprofile = await UserProfile.create(req.body)
        res.status(200).json(createprofile)
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
})

router.post('/logout', (req, res)=> {
    req.session.destroy((err)=> {
        if(err) throw err;
        res.json({msg: "Logged Out!"})
    })
})

// READ
router.get('/', isAuth, async(req, res) => {
    try {
        const users = await UserProfile.find().exec()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({msg: error})
    }
    })

// Update
router.put('/:id', async(req, res)=> {
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
// admin update user profile
router.put('/admin/:id', async(req, res) => {
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
router.delete('/:id', async(req, res)=> {
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
