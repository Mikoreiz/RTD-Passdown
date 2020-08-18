const mongoose = require('mongoose')
const db = require('./config.json')

const connectDB = async () => {
    try {
        await mongoose.connect(db.mongoConnect, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("DB connected")
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB