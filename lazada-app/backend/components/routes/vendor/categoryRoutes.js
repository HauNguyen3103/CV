const express = require("express");
const router = express.Router();
const CategoryController = require("../../controllers/vendor/categoryController.js");

router.get("/get-all", CategoryController.getAllCategory);

module.exports = router;
