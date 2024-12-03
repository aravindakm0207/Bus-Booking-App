const mongoose = require('mongoose')
const configureDB = async () => {
    try{ 
        const db = await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB Database')
    } catch(err) {
        console.log("MongoDB Database connection failed")
    }
}

module.exports = configureDB