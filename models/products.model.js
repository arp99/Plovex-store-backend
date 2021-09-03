const mongoose = require("mongoose")
const { Schema, model } = mongoose

const ProductSchema = new Schema({
    availableQty : { type : Number, required : "Available quantity is required" },
    brand        : { type : String, required : "Product Brand is required" },
    cateory      : { type : String, required : "Product category is required" },
    colors       : { type : [ String ] },
    discount     : { type : Number , default : 0 },       
    fastDelivery : { type : Boolean, required : "Fast delivery option is required" },
    image        : { type : String, required : "Product image is required" },
    inStock      : { type : Boolean, required : "Product in stock info required" },
    name         : { type : String, required : "Product name is required" },
    newLaunch    : { type : Boolean, required : "New launch Info required" },
    oldPrice     : { type : Number },
    price        : { type : Number, required : "Product price is required" },
    rating       : { stars : { type : Number, default : 0 } },
    sizes        : { type : [ String ] },
    url          : { type : String },
})

const Product = model("product" , ProductSchema)
module.exports = { Product }