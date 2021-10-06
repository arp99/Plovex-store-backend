const { Wishlist } = require("../models/wishlist.model")
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types

const getOrCreateWishlist = async ( req , res, next, id ) => {
    //find wishlist of an user, if not exist create one
    try{
        let wishlist = await Wishlist.findOne({ userId : id })

        if( !wishlist ){
            //then create new wishlist
            wishlist = new Wishlist({ userId : id , products : [] })
            wishlist = await wishlist.save()
        }
        //pass widhlist to the req object to the next route handler
        req.wishlist = wishlist
        next()
    }catch( err ){
        res.status( 500 )
            .json({
                success      : false,
                message      : "Failed to fetch/create wishlist",
                errorMessage : err.message
            })
    }
}

const getProductsInWishlist = async ( req, res ) => {
    try{
        let { wishlist } = req
        wishlist = await wishlist.populate({
            path : "products.productId",
            // TODO: add select to select specific fields  
        })
        
        res.status(200)
            .json({
                success : true,
                message : "Successfully fetched products from wishlist",
                data    : wishlist
            })
    }catch( err ){
        res.status(500)
            .json({
                success : false,
                message : "Failed to fetch wishlist products",
                errorMessage : err.message
            })
    }
}

const addOrUpdateWishlist = async ( req, res ) =>{
    try{
        const productToUpdate = req.body 
        const { wishlist } = req

        const isProductAlreadyAdded = wishlist.products.find(
            ( product ) => product.productId.toString() === productToUpdate.productId
        )
        // remove product if it is already in wishlist
        if( isProductAlreadyAdded ){
            const updatedProducts = wishlist.products.filter( 
                product => product.productId.toString() !== productToUpdate.productId 
            )
            wishlist.products = updatedProducts
        }else{
            wishlist.products.push({ productId : productToUpdate.productId })
        }
        let updatedWishlist = await wishlist.save()
        res.status(200)
            .json({
                success : true,
                message: "Successfully updated wishlist"
            })
    }catch( err ){
        res.status(500)
            .json({
                success      : false,
                message      : " Error in updating wihslist",
                errorMessage : err.message
            })
    }
}

module.exports = {
    addOrUpdateWishlist,
    getOrCreateWishlist,
    getProductsInWishlist
};