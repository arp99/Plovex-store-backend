const { Wishlist } = require("../models/wishlist.model")
const { Product } = require("../models/products.model")

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

const addToWishlist = async ( req, res ) =>{
    try{
        const productToUpdate = req.body 
        const { wishlist } = req

        const isProductAlreadyAdded = wishlist.products.find(
            ( product ) => product.productId.toString() === productToUpdate.productId
        )
        if( !isProductAlreadyAdded ){
            wishlist.products.push({ productId : productToUpdate.productId })
        }

        await wishlist.save()
        const productAdded = await Product.findOne({ _id : productToUpdate.productId })
        res.status(200)
            .json({
                success : true,
                message: "Successfully updated wishlist",
                product : productAdded
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

const removeFromWishlist = async ( req, res ) => {
    try{

        const productToRemove = req.body
        const { wishlist } = req
        const isProductAlreadyAdded = wishlist.products.find(
            ( product ) => product.productId.toString() === productToRemove.productId
        )

        if( isProductAlreadyAdded ){
            const updatedProducts = wishlist.products.filter( 
                product => product.productId.toString() !== productToRemove.productId 
            )
            wishlist.products = updatedProducts
        }
        await wishlist.save()

        res.status(200)
            .json({
                success : true,
                message: "Successfully updated wishlist"
            })
    }catch( err ){
        res.status(500)
            .json({
                success      : false,
                message      : " Error in updating wishlist",
                errorMessage : err.message
            })
    }
}

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getOrCreateWishlist,
    getProductsInWishlist
};