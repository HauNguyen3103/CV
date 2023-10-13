const Order = require("../../models/orderModel.js");

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();
      resolve({
        status: "OK",
        message: "Success",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderByVendor = (vendor_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find orders with products that have the same vendor_id
      const orders = await Order.find({
        "items.vendor._id": vendor_id,
      });

      // Extract and return products within each order that match the vendor_id
      const filteredOrders = orders.map((order) => {
        const filteredItems = order.items.filter(
          (item) => item.vendor._id.toString() === vendor_id.toString()
        );
        return {
          _id: order._id,
          customer: order.customer,
          items: filteredItems,
          subTotal: order.subTotal,
          shippingFee: order.shippingFee,
          total: order.total,
        };
      });

      resolve({
        status: "OK",
        message: "Success",
        data: filteredOrders,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrder = (product_id, order_id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if the order with the given order_id exists
      const checkOrder = await Order.findById(order_id);
      if (!checkOrder) {
        resolve({
          status: "ERR",
          message: "The order does not exist",
        });
        return;
      }

      // Find the product within the order's items
      const productIndex = checkOrder.items.findIndex(
        (product) => product._id.toString() === product_id
      );

      if (productIndex === -1) {
        resolve({
          status: "ERR",
          message: "The product is not defined in the order",
        });
        return;
      }

      // Update the status of the specific product
      checkOrder.items[productIndex].status = status;

      // Save the updated order
      const updatedOrder = await checkOrder.save();

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderStatus = (vendor_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find orders with products that have the same vendor_id
      const orders = await Order.find({
        "items.vendor._id": vendor_id,
      });

      // Initialize a status count object
      const statusCount = {
        New: 0,
        Shipped: 0,
        Cancelled: 0,
        Accepted: 0,
        Rejected: 0,
      };

      // Iterate through the orders and update the status count
      orders.forEach((order) => {
        order.items.forEach((product) => {
          const productStatus = product.status;
          if (statusCount.hasOwnProperty(productStatus)) {
            statusCount[productStatus]++;
          }
        });
      });

      resolve({
        status: "OK",
        message: "Success",
        data: statusCount,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllOrder,
  updateOrder,
  getAllOrderByVendor,
  getAllOrderStatus,
};
