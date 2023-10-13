const Category = require("../../models/categoryModel.js");

const getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allCategory = await Category.find();
      resolve({
        status: "OK",
        message: "Success",
        data: allCategory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCategory,
};
