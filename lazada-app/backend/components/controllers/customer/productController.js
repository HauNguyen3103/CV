const ProductService = require('../../services/customer/productService.js')
const Product = require('../../models/productModel.js')

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id
    if (!productId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The productId is required'
      })
    }
    const response = await ProductService.getDetailsProduct(productId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query
    const response = await ProductService.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    )
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}


const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType()
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const productFilterController = async (req, res) => {
  try {
    const { checked, priceRange } = req.body
    let args = {}

    if (checked.length > 0) {
      args['category._id'] = { $in: checked }
    }

    if (priceRange) {
      // Assuming priceRange is an array with two elements [minPrice, maxPrice]
      args.price = { $gte: priceRange[0], $lte: priceRange[1] }
    }

    const products = await Product.find(args)

    res.status(200).json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      success: false,
      message: 'Error while filtering products',
      error
    })
  }
}

// Product  Count
const productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount()
    res.status(200).send({
      success: true,
      total
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message: 'Error in product count',
      error,
      success: false
    })
  }
}

// Product List Base on Page

const productListController = async (req, res) => {
  try {
    const perPage = 6
    const page = req.params.page ? req.params.page : 1
    const products = await Product.find({})
      .select('image')
      .skip((page - 1) * perPage)
      .limt(perPage)
      .sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      data: products
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error in perpage ctrl',
      error
    })
  }
}

// const searchProductController = async (req, res) => {
//   try {
//     const {keyword} = req.params
//     const product = await Product.find({
//       $or: [
//         {name:{$regex: keyword, $options: "i"} },
//         {description:{$regex: keyword, $options: "i"}}
//       ]
//     }).select("image");

//     res.json(product)
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error in search product API",
//       error
//     })
//   }
// }

module.exports = {
  getDetailsProduct,
  getAllProduct,
  getAllType,
  productFilterController,
  productListController,
  productCountController
}
