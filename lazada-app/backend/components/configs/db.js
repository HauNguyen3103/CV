const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://mongodbdemo:mongodbdemo@cluster0.7qnw9jm.mongodb.net/lazada?retryWrites=true&w=majority'
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
