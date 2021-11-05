const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CategoryDataSchema = new Schema({
    title : { type: String, required: "Category title is required" },
    image : { type: String, required : "Category image is required" }
})

const Category = model("category" , CategoryDataSchema)
module.exports = { Category }