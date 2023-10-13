const Order = require("../../models/orderModel.js");
const Product = require("../../models/productModel.js");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { items, subTotal, shippingFee, total, customer } = newOrder;
    try {
      const createdOrder = await Order.create({
        items,
        subTotal,
        shippingFee,
        total,
        customer,
      });

      if (createdOrder) {
        resolve({
          status: "OK",
          message: "success",
          order: createdOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// const deleteManyProduct = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Product.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete product success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const cancelOrderDetails = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];
      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            selled: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: +order.amount,
              selled: -order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          order = await Order.findByIdAndDelete(id);
          if (order === null) {
            resolve({
              status: "ERR",
              message: "The order is not defined",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;

      if (newData) {
        resolve({
          status: "ERR",
          message: `San pham voi id: ${newData} khong ton tai`,
        });
      }
      resolve({
        status: "OK",
        message: "success",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = (customerID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find({"customer._id": customerID});
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

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    updateOrder,
};
