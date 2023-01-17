const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
   // res.json({ message: 'Register User'})
  const { name, email, password } = req.body //req.body = inpt data

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10) //10= no. of rounds
  const hashedPassword = await bcrypt.hash(password, salt)//password = plain text, salt=hashed pwd

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({   //201= ok. smt which is created
      _id: user.id,          //this will be shown in the display
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
   // res.json({ message: 'Login User'})
  const { email, password } = req.body  //get the emial and pwd

  // Check for user email
  const user = await User.findOne({ email })

  //Check password //password= plain pwd as login input, user.password= hashed/saved password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
// res.json({ message: 'User data display'})
//get the current logged in user becos we'll be sending the token and get the id from the token
  // res.status(200).json(req.user)
  const{_id, name, email} = await User.findById(req.user.id) //req.user, what user has authenticated

  res.status(200).json({
    id: _id,
    name,
    email
  })
})

// Generate JWT   //id = user id asthe payload
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}