const express = require('express')
const {  
    getOrCreateWishlist, 
    getProductsInWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/wishlist.controller')
const { verifyAuth } = require('../middlewares/authentication')
const router = express.Router()


router.param("userId", getOrCreateWishlist ) //now check if an empty wishlist exist for the user, if not create it

router.route("/:userId/wishlist_products")
    .get( verifyAuth, getProductsInWishlist ) //get all products in wishlist
router.route("/:userId/add_to_wishlist")
    .post( verifyAuth, addToWishlist ) //add or update products in wishlist
router.route("/:userId/remove_from_wishlist")
    .post( verifyAuth, removeFromWishlist )

module.exports = router