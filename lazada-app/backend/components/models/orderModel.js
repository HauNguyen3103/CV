const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    description: { type: String },
    date: { type: String },
    category: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      name: { type: String, ref: "Category" },
    },
    price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    img: { type: String },
    vendor: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
      },
      name: { type: String, ref: "Vendor", required: true },
    },
    status: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const orderSchema = new mongoose.Schema(
  {
    items: [productSchema],
    subTotal: Number,
    shippingFee: Number,
    total: Number,
    customer: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
      },
      name: { type: String, ref: "Customer", required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
