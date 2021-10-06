const express = require("express")
const { 
    getOrCreateCart, 
    getProductsInCart, 
    addOrUpdateCart,
    decreaseItemQty,
    removeItemFromCart 
} = require("../controllers/cart.controller")
const { verifyAuth } = require("../middlewares/authentication")
const router = express.Router()

router.param("userId", getOrCreateCart )

router.route("/:userId/cart_products")
    .get( verifyAuth, getProductsInCart )
router.route("/:userId/update_cart")
    .post( verifyAuth, addOrUpdateCart )
router.route("/:userId/decrease_cart_item")
    .post( verifyAuth, decreaseItemQty )
router.route("/:userId/remove_item_from_cart")
    .post( verifyAuth, removeItemFromCart )

module.exports = router