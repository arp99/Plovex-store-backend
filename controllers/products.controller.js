const { Product } = require("../models/products.model")

const getAllProducts = async ( req , res ) => {
    try{
        const products = await Product.find({});
        res.status(200).json({ success : true, message : "Products fetched successfully", data : products })
    }catch( err ){
        res.status(500)
            .json({ 
                success      : false, 
                message      : "Error in fetching Products",
                errorMessage : err.message
            })
    }
}

const addNewProduct = async ( req, res ) => {
    try{
        const productToAdd = req.body;
        const newProduct = new Product(productToAdd)
        const savedProduct = await newProduct.save()
        res.status(201).json({ success : false, message : "Product added successfully", data : savedProduct })
    }catch( err ){
        res.status(500).json({
            success : false,
            message : "Error in saving product",
            errorMessage : err.message
        })
    }
}

const getProductById = async ( req, res ) =>{
    try{
        const productId = req.params
        const product = await Product.findById({ _id : productId.id })
        if( product ){
            res.status(200).json({ success : true, message : "Successfully found product", data : product })
        }else{
            res.status(404).json({ success : false, message : "Product not found" })
        }
    }catch( err ){
        res.status(500).json({
            success      : false,
            message      : "Error in fetching product",
            errorMessage : err.message 
        })
    }
}

module.exports = { getAllProducts, addNewProduct, getProductById }