const User = require('../../models/userModel.js')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// const {
//   genneralAccessToken,
//   genneralRefreshToken,
// } = require("./jwtService.js");

const createUser = newUser => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = newUser
    try {
      const checkUser = await User.findOne({
        email: email
      })
      if (checkUser !== null) {
        resolve({
          status: 'ERR',
          message: 'The email is already created'
        })
      }
      const hash = bcrypt.hashSync(password, 10)
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone
      })
      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdUser
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const loginUser = userLogin => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin
    try {
      const checkUser = await User.findOne({
        email: email
      })

      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password)

      if (!comparePassword) {
        resolve({
          status: 'ERR',
          message: 'The password or user is incorrect'
        })
      }
      const token = await JWT.sign({ _id: checkUser._id }, '123', {
        expiresIn: '2d'
      })

      resolve({
        status: 'OK',
        message: 'SUCCESS',
        checkUser,
        token
      })
    } catch (e) {
      reject(e)
    }
  })
}

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id
      })
      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedUser
      })
    } catch (e) {
      reject(e)
    }
  })
}

const deleteUser = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id
      })
      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }

      await User.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'Delete user success'
      })
    } catch (e) {
      reject(e)
    }
  })
}

const deleteManyUser = ids => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids })
      resolve({
        status: 'OK',
        message: 'Delete user success'
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find().sort({ createdAt: -1, updatedAt: -1 })
      resolve({
        status: 'OK',
        message: 'Success',
        data: allUser
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getDetailsUser = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id
      })
      if (user === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: user
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser
}