
//* bcrypt dependencies
const bcrypt = require("bcrypt");
const saltRounds = 10;


//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const UserLogin = require("../models/UserLogin");

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
            role: "user"
    }]);
    res.json(userlogin)
})

// ROUTES
// CREATE
router.post('/', async(req, res) => {
    //conditionals - input check
    if (req.body.username.length < 3 || req.body.firstname.length === 0 || req.body.lastname.length === 0) {
        res.status(400).json({msg: "No name"});
        return;
    }
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(saltRounds));
    try {
        const signup = await UserLogin.create(req.body);
        res.status(200).json(signup);
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
