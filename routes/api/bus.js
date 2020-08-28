const express = require("express")
const router = express.Router()
const updateOptions = require("../../helpers/updateOptions")
const archiveOptions = require("../../helpers/archiveOptions")
const Bus = require("../../model/bus")

/*---------------------------------------
  CRUD functionalities for Bus repair log
----------------------------------------*/

router.post("/add", async (req, res) => {
    try {
        const bus = new Bus({
            number : req.body.number,
            type: req.body.type,
            noPart: req.body.noPart,
	        description : req.body.description,
        })

        const add = await bus.save()
        
        res.json(bus)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

router.get("/", async (req, res) => {
    try {
        const buses = await Bus.find({fixed: false})

        if (!buses) {
            return res.status(400).json({ msg: "No buses"})
        }
        
        res.json({data: buses})
        console.log(buses)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

router.put("/update/:_id", async (req, res) => {
    try {
        const updatedBus = updateOptions(req)

        if (!updatedBus) {
            return res.status(400).json({ msg: "No updates added"})
        }

        const newBus = await Bus.findOneAndUpdate({_id: req.params._id}, 
                            updatedBus, 
                            {upsert: true, new: true})
        
        res.json(newBus)
        console.log(newBus)
        
        } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.delete("/delete/:_id", async (req, res) => {
    try {
        await Bus.findOneAndRemove({ _id: req.params._id })

        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

/*---------------------------------------
  For archived logs
----------------------------------------*/

router.get("/archive", async (req, res) => {
    try {

        const fields = archiveOptions(req)

        const archive = await Bus.find(fields)

        if(!archive) {
            return res.status(400).send("No archived logs found")
        }

        res.json({data: archive})

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = router

