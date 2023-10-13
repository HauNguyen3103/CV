const UserRouter = require("./customer/userRoutes.js");
const ProductRouter = require("./customer/productRoutes.js");
const OrderRouter = require("./customer/orderRoutes.js");

const VendorRouter = require("./vendor/vendorRoutes.js");
const VendorProductRouter = require("./vendor/productRoutes.js");
const VendorCategoryRouter = require("./vendor/categoryRoutes.js");
const VendorOrderRouter = require("./vendor/orderRoutes.js");

const routes = (app) => {
  // User/Customer routes
  app.use("/api/customer/user", UserRouter);
  app.use("/api/customer/product", ProductRouter);
  app.use("/api/customer/order", OrderRouter);

  // Vendor routes
  app.use("/api/vendor/user", VendorRouter);
  app.use("/api/vendor/product", VendorProductRouter);
  app.use("/api/vendor/category", VendorCategoryRouter);
  app.use("/api/vendor/order", VendorOrderRouter);
};

module.exports = routes;
