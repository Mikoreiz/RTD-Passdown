const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./db");
const app = express();
const cors = require('cors')

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Credentials", "true")
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
//     res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, content-type, Accept, Authorization")
//     next()
// })

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect DB
connectDB()

app.use(express.json({ extended: false }))

// Passdown Data
app.use("/bus", require("./routes/api/bus"))
app.use("/archive", require("./routes/api/archive"))

app.listen(3001, () => console.log("Passdown running on port 3001..."))