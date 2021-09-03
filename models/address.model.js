const mongoose = require("mongoose")
const { Schema, model } = mongoose

const addressSchema = new Schema({
    city        : { type : String, required : "City name is required" },
    country     : { type : String, required :"Country is required"},
    userId      : { type : Schema.Types.ObjectId, ref : "user", required :"UserId is required" },
    houseNumber : { type : String, required : "House number is required" },
    mobile      : { type : String, required : "Mobile number is required" },
    pinCode     : { type : Number, required : "PINCODE is required" },
    state       : { type : String, required :"State is required" },
    street      : { type : String, default : null }
})

const Address = model("address" , addressSchema)
module.exports = { Address }