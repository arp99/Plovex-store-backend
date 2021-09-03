const mongoose = require("mongoose")

const connectToDatabase = async () =>{
    await mongoose.connect( process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    console.log("Successfully connected to database")
}
module.exports = connectToDatabase