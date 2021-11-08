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
        res.status(201).json({ success : true, message : "Product added successfully", data : savedProduct })
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

const getProductsByBrand = async ( brand ) => {
    try{
        const productBrand = brand
        const products = await Product.find({ brand : productBrand })
        if( products.length > 0 ){
            return {
                statusCode : 200,
                success    : true,
                message    : "Successfully found products",
                data       : products
            }
        }
        else{
            return {
                statusCode : 404,
                success    : false,
                message    : "Product not found"
            }
        }
    }catch( err ){
        throw ({
            statusCode   : 500,
            child        : true,
            success      : false,
            message      : "Error in fetching product",
        })
    }
}

const getProductsByCategory = async ( category ) => {
    try{
        const productCategory = category
        const products = await Product.find({ category : productCategory })
        if( products.length > 0 ){
            
            return {
                statusCode : 200,
                success    : true,
                message    : "Successfully found products",
                data       : products
            } 
        }
        else{
            return {
                statusCode : 404,
                success    : false,
                message    : "Product not found"
            }
        }        
    }catch( err ){
        throw ({
            statusCode   : 500,
            child        : true,
            success      : false,
            message      : "Error in fetching product",
        })
    }
}


const getFilteredProducts = async (req, res) => {
    try{
        const brand = req.query.brand
        const category = req.query.category
        let response
        if( brand ){
            response =  await getProductsByBrand(brand.toLowerCase())
        }
        if( category ){
            response = await getProductsByCategory(category.toLowerCase())
        }
        res.status( response.statusCode )
            .json( response )

    }catch( err ){
        console.log( err )
        res.status(500)
            .json({
                success : false,
                message : err.child ? err.message : "Error in fetching filtered products",
            })
    }
}


module.exports = { 
    getAllProducts, 
    addNewProduct, 
    getProductById, 
    getProductsByBrand,
    getProductsByCategory,
    getFilteredProducts 
}