const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/payments.controller");

router.route("/").post(makePayment);

module.exports = router