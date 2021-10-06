const express = require("express")
const { 
    createNewUser, 
    getUserById,
    getUserData,
    updateUserData
} = require("../controllers/users.controller")
const { verifyAuth } = require("../middlewares/authentication")
const router = express.Router()

router.route("/")
    .get( verifyAuth , getUserData )

router.route("/signup")
    .post( createNewUser )

router.route("/update")
        .post( verifyAuth, updateUserData )

module.exports = router