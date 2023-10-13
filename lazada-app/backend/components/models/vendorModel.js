const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, unique: true },
    verified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Seller", userSchema);

module.exports = Vendor;
