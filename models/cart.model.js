const mongoose = require("mongoose")
const { Schema, model } = mongoose

const cartSchema = new Schema({
    addressId : { type : Schema.Types.ObjectId, ref : "address", default : null },
    userId    : { type : Schema.Types.ObjectId, ref : "user" },
    products  : [ 
        { 
            color     : { type : String },
            productId : { type : Schema.Types.ObjectId, ref : "product" },
            quantity  : { type : Number, required : "Quantity is required", default : 1},
            size      : { type : String, required : "Size is required" },
        } 
    ]
})

const Cart = model("cart" , cartSchema)
module.exports = { Cart }