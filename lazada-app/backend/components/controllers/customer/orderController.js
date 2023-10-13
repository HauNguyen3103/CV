const OrderService = require("../../services/customer/orderService.js");

const createOrder = async (req, res) => {
  try {
    const { items, subTotal, shippingFee, total, customer } = req.body;

    if (!items || !subTotal || !shippingFee || !total || !customer) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid input data",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const data = req.body.orderItems;
    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderService.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const { customerID } = req.body;
    const data = await OrderService.getAllOrder(customerID);
    

    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateOrder = async (req, res) => {
    try {
      const { productId, orderId, status } = req.body;
      if (!productId) {
        return res.status(200).json({
          status: "ERR",
          message: "The productId is required",
        });
      }
      if (!orderId) {
        return res.status(200).json({
          status: "ERR",
          message: "The orderId is required",
        });
      }
      if (!status) {
        return res.status(200).json({
          status: "ERR",
          message: "The Status is required",
        });
      }
      const response = await OrderService.updateOrder(productId, orderId, status);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

module.exports = {
  createOrder,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
  updateOrder
};
