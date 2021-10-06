const express = require('express')
const { getUserById } = require('../controllers/users.controller')
const {  
    addOrUpdateWishlist, 
    getOrCreateWishlist, 
    getProductsInWishlist
} = require('../controllers/wishlist.controller')
const { verifyAuth } = require('../middlewares/authentication')
const router = express.Router()


router.param("userId", getOrCreateWishlist ) //now check if an empty wishlist exist for the user, if not create it

router.route("/:userId/wishlist_products")
    .get( verifyAuth, getProductsInWishlist ) //get all products in wishlist
router.route("/:userId/update_wishlist")
    .post( verifyAuth, addOrUpdateWishlist ) //add or update products in wishlist

module.exports = router