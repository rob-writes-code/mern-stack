const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold)
        process.exit(1) // 1 means 'failure'
    }
}

module.exports = connectDB;