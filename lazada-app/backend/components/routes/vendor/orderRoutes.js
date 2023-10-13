const express = require("express");
const router = express.Router();
const OrderController = require("../../controllers/vendor/orderController.js");

// router.get(
//   "/get-all-order/:id",
//   // authUserMiddleWare,
//   OrderController.getAllOrderDetails
// );
// router.get("/get-details-order/:id", OrderController.getDetailsOrder);
// router.delete(
//   "/cancel-order/:id",
//   // authUserMiddleWare,
//   OrderController.cancelOrderDetails
// );
router.get("/get-all-order", OrderController.getAllOrder);
router.put("/update-order", OrderController.updateOrder);
router.post("/get-order-by-vendor", OrderController.getAllOrderByVendor);
router.post("/get-all-order-status", OrderController.getAllOrderStatus);

module.exports = router;
