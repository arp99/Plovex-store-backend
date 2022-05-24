const express = require("express")
const { 
    getUserById,
    getUserData,
    updateUserData,
    addAddress
} = require("../controllers/users.controller")
const { verifyAuth } = require("../middlewares/authentication")
const router = express.Router()

router.route("/")
    .get( verifyAuth , getUserData )

router.route("/address")
    .post( verifyAuth, addAddress )

router.route("/update")
        .post( verifyAuth, updateUserData )

module.exports = router