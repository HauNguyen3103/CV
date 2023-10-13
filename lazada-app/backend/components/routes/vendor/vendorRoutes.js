const express = require("express");
const router = express.Router();
const vendorController = require("../../controllers/vendor/vendorController.js");
// const {
//   authMiddleWare,
//   authVendorMiddleWare,
// } = require("../middlewares/vendor/authMiddleware.js");

router.post("/sign-up", vendorController.createVendor);
router.post("/sign-in", vendorController.loginVendor);
router.post("/log-out", vendorController.logoutVendor);
// router.put("/update-user/:id", authVendorMiddleWare, vendorController.updateVendor);
// router.delete("/delete-user/:id", authMiddleWare, vendorController.deleteVendor);
// router.get("/getAll", authMiddleWare, vendorController.getAllVendor);
// router.get(
//   "/get-details/:id",
//   authVendorMiddleWare,
//   vendorController.getDetailsVendor
// );
// router.post("/refresh-token", vendorController.refreshToken);
// router.post("/delete-many", authMiddleWare, vendorController.deleteMany);

module.exports = router;
