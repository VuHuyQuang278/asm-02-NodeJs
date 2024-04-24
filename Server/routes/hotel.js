const express = require("express");

const hotelController = require("../controllers/hotel");

const router = express.Router();

router.post("/signup", hotelController.postSignUp);

router.post("/login", hotelController.postLogin);

module.exports = router;
