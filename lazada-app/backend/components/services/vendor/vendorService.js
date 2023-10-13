const Vendor = require("../../models/vendorModel.js");
const bcrypt = require("bcrypt");
// const {
//   genneralAccessToken,
//   genneralRefreshToken,
// } = require("./jwtService.js");
const JWT = require("jsonwebtoken");

const createVendor = (newVendor) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = newVendor;
    const verified = "false";
    try {
      const checkVendor = await Vendor.findOne({
        email: email,
      });
      if (checkVendor !== null) {
        resolve({
          status: "ERR",
          message: "The email is already created",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdVendor = await Vendor.create({
        name,
        email,
        password: hash,
        phone,
        verified,
      });
      if (createdVendor) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdVendor,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginVendor = (vendorLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = vendorLogin;
    try {
      const checkVendor = await Vendor.findOne({
        email: email,
      });

      if (checkVendor === null) {
        resolve({
          status: "ERR",
          message: "The vendor is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkVendor.password
      );

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or vendor is incorrect",
        });
      }

      const token = await JWT.sign({ _id: checkVendor._id }, "123", {
        expiresIn: "2d",
      });

      console.log(checkVendor);

      resolve({
        status: "OK",
        message: "SUCCESS",
        name: checkVendor.name,
        verified: checkVendor.verified,
        _id: checkVendor._id,
        token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateVendor = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkVendor = await Vendor.findOne({
        _id: id,
      });
      if (checkVendor === null) {
        resolve({
          status: "ERR",
          message: "The vendor is not defined",
        });
      }

      const updatedVendor = await Vendor.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedVendor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteVendor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkVendor = await Vendor.findOne({
        _id: id,
      });
      if (checkVendor === null) {
        resolve({
          status: "ERR",
          message: "The vendor is not defined",
        });
      }

      await Vendor.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete vendor success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyVendor = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Vendor.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete vendor success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllVendor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allVendor = await Vendor.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "OK",
        message: "Success",
        data: allVendor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsVendor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vendor = await Vendor.findOne({
        _id: id,
      });
      if (vendor === null) {
        resolve({
          status: "ERR",
          message: "The vendor is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: vendor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createVendor,
  loginVendor,
  updateVendor,
  deleteVendor,
  getAllVendor,
  getDetailsVendor,
  deleteManyVendor,
};
