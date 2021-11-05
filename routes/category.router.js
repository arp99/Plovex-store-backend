const express = require('express')
const { addCategory } = require('../controllers/category.controller')
const router = express.Router()

router.route("/")
    .post( addCategory )

module.exports = router