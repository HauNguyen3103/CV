const VendorService = require("../../services/vendor/vendorService.js");
// const JwtService = require("../../services/vendor/jwtService.js");

const createVendor = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    }
    const response = await VendorService.createVendor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    }

    const response = await VendorService.loginVendor(req.body);
    // const { refresh_token, ...newReponse } = response;
    // res.cookie("refresh_token", refresh_token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
    //   path: "/",
    // });
    // return res.status(200).json({ ...newReponse, refresh_token });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const data = req.body;
    if (!vendorId) {
      return res.status(200).json({
        status: "ERR",
        message: "The vendorId is required",
      });
    }
    const response = await VendorService.updateVendor(vendorId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    if (!vendorId) {
      return res.status(200).json({
        status: "ERR",
        message: "The vendorId is required",
      });
    }
    const response = await VendorService.deleteVendor(vendorId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await VendorService.deleteManyVendor(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllVendor = async (req, res) => {
  try {
    const response = await VendorService.getAllVendor();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    if (!vendorId) {
      return res.status(200).json({
        status: "ERR",
        message: "The vendorId is required",
      });
    }
    const response = await VendorService.getDetailsVendor(vendorId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    // const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutVendor = async (req, res) => {
  try {
    // localStorage.removeItem("auth");

    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createVendor,
  loginVendor,
  updateVendor,
  deleteVendor,
  getAllVendor,
  getDetailsVendor,
  refreshToken,
  logoutVendor,
  deleteMany,
};
