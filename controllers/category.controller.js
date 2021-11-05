const { Category } = require("../models/categoryData.model")

const addCategory = async ( req, res ) => {
    try{
        
        const categoryToAdd = req.body;
        const newCategory = new Category( categoryToAdd )
        const savedCategory = await newCategory.save()
        res.status( 201 ).json({ success : true, message : "Category data saved successfully", data : savedCategory })
    }catch( err ){
        res.status( 500 )
            .json({
                success      : false,
                message      : "Failed to add category data",
                errorMessage :  err.message
            })
    }
}

module.exports = { addCategory }