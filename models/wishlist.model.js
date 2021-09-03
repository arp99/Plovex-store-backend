const mongoose = require("mongoose")
const { Schema, model } = mongoose

const wishlistSchema = new Schema({
    products : [ { productId : { type : Schema.Types.ObjectId, ref : "product" } } ],
    userId   : { type : Schema.Types.ObjectId, ref : "user" },
})

const Wishlist = model("wishlist" , wishlistSchema)
module.exports = { Wishlist }