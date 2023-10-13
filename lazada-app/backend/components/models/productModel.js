const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
    quantity: { type: Number, required: true },
    img: { type: String },
    vendor: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
      },
      name: { type: String, ref: "Vendor", required: true },
    },
    name: { type: String, required: true, unique: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;