//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const MedPrescription = require("../models/MedPrescription.js");

//* SEED
router.get("/seed", async(req, res) => {
    //await MedPrescription.deleteMany({})
    const medprescription = await MedPrescription.insertMany([{
        loginInfo: "6358d9e079d6f26ab0fb7bd6",
    startDate: "2022/12/15",
    duration: "5 days",
    medicine: "panadol",
    dosage: "2 times per day",
    interval: "1 week",
    instruction: "after meal"
    }])
    res.json(medprescription)
})

// ROUTES
// CREATE
router.post('/', async(req, res)=> {
    try {
        const createprofile = await MedPrescription.create(req.body)
        res.status(200).json(createprofile)
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
})

// READ

router.get('/', async (req, res)=> {
    try {
        const users = await MedPrescription.find().exec() //need google
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error})
    }
})



// Update
router.put('/:id', async(req, res)=> {
    const {id} = req.params
    try {
        const updateuser = await MedPrescription.findByIdAndUpdate(id);
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
            const deleteuser = await MedPrescription.findByIdAndDelete(id);
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
