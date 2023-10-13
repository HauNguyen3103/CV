const CategoryService = require("../../services/vendor/categoryService.js");

const getAllCategory = async (req, res) => {
  try {
    const response = await CategoryService.getAllCategory();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getAllCategory,
};
