const express = require('express')
const { fetchHomePageData } = require('../controllers/homePage.controller')

const router = express.Router()

router.route('/data')
    .get( fetchHomePageData )

module.exports = router