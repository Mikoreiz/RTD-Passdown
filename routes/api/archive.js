const express = require("express")
const router = express.Router()
const archiveOptions = require("../../helpers/archiveOptions")
const Bus = require("../../model/bus")

/*---------------------------------------
  For archived logs
----------------------------------------*/

router.get("/", async (req, res) => {
    try {
        const archive = await Bus.find({fixed: true})

        if(!archive) {
            return res.status(400).json({ msg:"No archived logs found"})
        }

        res.json({data: archive})
        console.log(archive)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.get("/filter", async (req, res) => {
    try {

        const fields = archiveOptions(req.query)
        filterOptions = req.query
        const archive = await Bus.find(fields)

        if(!archive) {
            return res.status(400).send("No archived logs found")
        }

        res.json({
                filterOptions,
                data: archive
            })

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = router