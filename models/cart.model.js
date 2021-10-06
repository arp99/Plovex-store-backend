const mongoose = require("mongoose")
const { Schema, model } = mongoose

const cartSchema = new Schema({
    addressId : { type : Schema.Types.ObjectId, ref : "address", default : null },
    userId    : { type : Schema.Types.ObjectId, ref : "user", required : "UserId is required" },
    products  : [ 
        { 
            productId : { type : Schema.Types.ObjectId, ref : "product" },
            quantity  : { type : Number, default : 1},
        } 
    ]
})

const Cart = model("cart" , cartSchema)
module.exports = { Cart }