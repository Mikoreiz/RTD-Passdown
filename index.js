const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./db");
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect DB
connectDB()

app.use(express.json({ extended: false }))

// Passdown Data
app.use("/bus", require("./routes/api/bus"))

app.listen(3001, () => console.log("Passdown running on port 3001..."))