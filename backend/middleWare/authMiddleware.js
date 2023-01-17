const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1] //turn into array, split by space. bearer 0 index and token is the second item/index //so 1 will give just the token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token //id= same as userController id line 85
      req.user = await User.findById(decoded.id).select('-password')
                                                        //-password, it wont include the (hashed)pwd

      next()
    } catch (error) {
      console.log(error)
      res.status(401)  //401= not authorized
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }