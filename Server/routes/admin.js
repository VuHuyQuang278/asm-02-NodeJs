const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/login", adminController.postLogin);

router.get("/", adminController.getDataAdminPage);

router.get("/hotel", adminController.getListHotel);

router.get("/hotel/add-hotel", adminController.getAddHotel);

router.post("/hotel/add-hotel", adminController.postAddHotel);

router.post("/hotel/delete-hotel", adminController.postDeleteHotel);

module.exports = router;
