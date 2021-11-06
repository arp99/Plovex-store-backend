const express = require("express")
const { 
    getUserById,
    getUserData,
    updateUserData
} = require("../controllers/users.controller")
const { verifyAuth } = require("../middlewares/authentication")
const router = express.Router()

router.route("/")
    .get( verifyAuth , getUserData )

router.route("/update")
        .post( verifyAuth, updateUserData )

module.exports = router