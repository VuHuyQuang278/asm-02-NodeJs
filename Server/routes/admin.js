const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/login", adminController.postLogin);

router.get("/", adminController.getDataAdminPage);

module.exports = router;
