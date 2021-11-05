const { Category } = require('../models/categoryData.model')
const { Product } = require('../models/products.model')

const fetchHomePageData = async ( req, res ) => {
    try{
        const categoryData = await Category.find({})
        const newProducts = await Product.find({ newLaunch : true }).limit(8)
        const homePageData = {
            categoryData,
            newProducts
        }
        res.status( 200 )
            .json({
                success : true,
                message : "Successfully fetched home page data",
                homePageData
            })
    }catch( err ){
        res.status(500)
            .json({
                status : false,
                message : "Failed to fetch home page data",
                errorMessage : err.message
            })
    }
}

module.exports  = { fetchHomePageData }