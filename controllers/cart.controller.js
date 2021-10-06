const { Cart } = require("../models/cart.model")
const { Product } = require("../models/products.model")

const getOrCreateCart = async ( req, res, next, id ) =>{
    try{    

        let cart = await Cart.findOne({ userId : id })
        console.log("cart search: ", cart)
        if( !cart ){
            console.log("if card not found: ", cart)
            cart = new Cart({ userId : id, products : [] })
            await cart.save()
            cart = await Cart.findOne({ userId : id })
        }
        req.cart = cart
        next()
    }catch( err ){
        res.status( 500 )
            .json({
                success      : false,
                message      : "Failed to fetch / create cart",
                errorMessage : err.message
            })
    }
}

const getProductsInCart = async ( req, res ) =>{
    try{

        const { cart } = req
        const cartData = await cart.populate({
            path : "products.productId"
        })

        res.status( 200 )
            .json({
                success : true,
                mesage  : "Successfully fetched products in cart",
                data    : cartData
            })
    }catch( err ){
        res.status( 500 )
            .json({
                success      : false,
                message      : "Failed to fetch products in cart",
                errorMessage : err.message
            })
    }
}

const addOrUpdateCart = async ( req, res ) =>{
    try{
        const productsToUpdate = req.body 
        const { cart } = req

        console.log("cart value: ", cart)
        // See if the product is already in cart 
        const isProductInCart = cart.products.find( 
            product => product.productId.toString() === productsToUpdate.productId 
        )
        
        // find the product whos availabe qty needs to be updated
        const productToUpdate = await Product.findById({ _id : productsToUpdate.productId })

        console.log("Isproduct in cart : ", isProductInCart)
        if( isProductInCart ){
            //simply increase the quantity
            isProductInCart.quantity += 1
            //also decrease the available quantity
            productToUpdate.availableQty -= 1
        }else{
            // error is here 
            productToUpdate.availableQty -= 1
            cart.products.push({
                productId : productsToUpdate.productId,
                quantity   : 1
            })
        }
        await productToUpdate.save() //update availableQty of product
        let updatedCart = await cart.save()
        updatedCart = await updatedCart.populate({
            path : "products.productId"
        })

        res.status(200)
            .json({
                success : true,
                message : "Successfully updated cart",
                data    : updatedCart 
            })
    }catch( err ){
        res.json({
            success      : false,
            message      : "Failed to update cart",
            errorMessage : err.message
        })
    }
}

const removeItemFromCart = async( req, res ) =>{
    try{
        const productToRemove = req.body 
        const { cart } = req

        const ProductInCart = cart.products.find( 
            product => product.productId.toString() === productToRemove.productId 
        )

        if( ProductInCart ){
            const productToUpdate = await Product.findById({ _id : productToRemove.productId })
            
            productToUpdate.availableQty += ProductInCart.quantity
            
            let updatedCart = cart.products.filter( product =>(
                    product.productId.toString() !== productToRemove.productId
                )
            )
            cart.products = updatedCart
            await productToUpdate.save()
            updatedCart = await cart.save()

            updatedCart = await updatedCart.populate({
                path : "products.productId"
            })
            res.status(200)
            .json({
                success : true,
                message : "Successfully updated cart",
                data    : updatedCart 
            })
        }else{
            res.status(404)
            .json({
                success : false,
                message : "Item not found in cart"
            })
        }
    }catch( err ){
        res.json({
            success      : false,
            message      : "Failed to remove item",
            errorMessage : err.message
        })
    }
}

const decreaseItemQty = async ( req, res )=>{
    try{
        const productToDecrement = req.body 
        const { cart } = req

        const ProductInCart = cart.products.find( 
            product => product.productId.toString() === productToDecrement.productId 
        )
        const productToUpdate = await Product.findById({ _id : productToDecrement.productId })

        if( ProductInCart && ProductInCart.quantity > 1){
            productToUpdate.availableQty += 1
            ProductInCart.quantity -= 1
            await productToUpdate.save()
     
            let updatedCart = await cart.save()
            updatedCart = await updatedCart.populate({
                path : "products.productId"
            })
    
            res.status(200)
                .json({
                    success : true,
                    message : "Successfully decremented product quantity",
                    data    : updatedCart 
                })

        }else{
            throw Error
        }

    }catch( err ){
        res.json({
            success      : false,
            message      : "Failed: Either product does not exist or there is one item",
            errorMessage : err.message
        })
    }
}

module.exports = {
    addOrUpdateCart,
    getOrCreateCart,
    getProductsInCart,
    removeItemFromCart,
    decreaseItemQty
}