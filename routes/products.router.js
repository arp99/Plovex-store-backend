const express = require("express")
const router = express.Router()
const { 
    addNewProduct, 
    getAllProducts, 
    getProductById 
} = require("../controllers/products.controller")

router.route("/")
    .get( getAllProducts )
    .post( addNewProduct )

router.route("/:id")
    .get( getProductById )

module.exports = { router }
