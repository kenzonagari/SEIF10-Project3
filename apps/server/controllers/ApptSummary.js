//* DEPENDENCIES
const express = require("express");
const router = express.Router();
const ApptSummary = require("../models/ApptSummary.js");

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
    prescriptionInfo: "NA",
    billingInfo: 50
    }])
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
     prescriptionInfo: "NA",
     billingInfo: 50
     }])
     res.json(apptsummary)
 })

 //  /admin/:id (admin can read all)
 router.get("/test2", async(req, res) => {
    try {
        const alldata = await ApptSummary.find({}).populate(["loginInfo", "medPrescription"])
      
        res.status(200).json(alldata)
    } catch (error) {
        res.status(500).json({ msg: error });
      } 
 })
// ROUTES
// CREATE
router.post('/', async(req, res)=> {
    try {
        const createprofile = await ApptSummary.create(req.body)
        res.status(200).json(createprofile)
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
})

// READ

router.get('/', async (req, res)=> {
    try {
        const users = await ApptSummary.find().exec() //need google
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error})
    }
})


// Update
router.put('/:id', async(req, res)=> {
    const {id} = req.params
    try {
        const updateuser = await ApptSummary.findByIdAndUpdate(id);
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
            const deleteuser = await ApptSummary.findByIdAndDelete(id);
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
