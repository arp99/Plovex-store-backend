const { User } = require("../models/user.model")
const bcrypt = require("bcrypt")

const getUserById = async ( req , res, next, id) => {
    try{
        const user = await User.find({ userId : id })

        if( !user ){
            res.status(404)
                .json({ 
                    success : false,
                    message : "No user found, send valid userId!"
                })
        }
        req.user = user
        next()
    }catch( err ){
        res.status(500)
            .json({
                success      : false,
                message      : "Failed to verify userId",
                errorMessage : err.message
            })
    }
}

const getUserData = async ( req, res ) => {
    try{

        let { user } = req //this will come from the authentication middleware
        console.log("User id from token: " , user )
        const foundUser = await User.findOne({ _id : user.userId})
        res.status(200).json({
            success : true,
            message : "Successfully fetched user data",
            data : foundUser
        })
    }catch( err ){
        res.status(500)
            .json({
                success : false,
                message : "Failed to fetch user data",
                errorMessage : err.message 
            })
    }
}



const createNewUser = async ( req, res ) => {
    try{
        const { firstName, lastName, password, email } = req.body 
        //check if user already exists by the email
        const isUserExist = await User.findOne({ email })
        if( isUserExist ){
            return res.status(409)
                .json({
                    success : false,
                    message : "Account already exists with this email!"
                })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash( password, saltRounds );
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword
        })
        await newUser.save()
        res.status(201)
            .json({
                success : true,
                message : "Successfully created user"
            })

    }catch( err ){
        res.status( 500 )
            .json({
                success      : false,
                message      : "Failed to create new user!",
                errorMessage : err.message 
            })
    }
}

const updateUserData = async ( req, res ) => {
    try{
        let { user } = req
        //extract all except the password, so that the password can't be changed directly
        const { firstName, lastName, email } = req.body
        let foundUser = await User.findOne({ _id : user.userId })
        
        foundUser.firstName = firstName ?? foundUser.firstName
        foundUser.lastName  = lastName ?? foundUser.lastName
        foundUser.email = email ?? foundUser.email

        user = await foundUser.save()
        res.status( 200 )
            .json({
                success : true,
                message : "User details updated successfully",
                data : {
                    email     : user.email,
                    firstName : user.firstName,
                    lastName  : user.lastName,
                    userId    : user._id
                }
            })
    }catch( err ){
        res.status( 500 )
            .json({
                success      : false,
                message      : "Failed to update user details!",
                errorMessage : err.message
            })
    }
}

module.exports = {
    getUserById,
    createNewUser,
    updateUserData,
    getUserData
}