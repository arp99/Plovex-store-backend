const express = require("express")
const router = express.Router()
const { 
    addNewProduct, 
    getAllProducts, 
    getProductById, 
    getFilteredProducts
} = require("../controllers/products.controller")

router.route("/")
    .get( getAllProducts )
    .post( addNewProduct )

router.route("/filter")
    .get( getFilteredProducts )
router.route("/:id")
    .get( getProductById )

module.exports = router