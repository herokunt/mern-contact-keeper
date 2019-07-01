const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config') // again, this is the config npm module not the file!

const User = require('../models/User')

// @route       POST api/users
// @desc        Register a new user
// @access      Public
router.post('/', [
  check('name', 'Please add a username').trim().not().isEmpty(),
  check('email', 'Please include a valid email').trim().isEmail(),
  check('password', 'Please enter a password with 6 or more characters').trim().isLength({ min: 6 })
],
async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email: email })

    if(user){
      return res.status(400).json({ msg: 'User already exists' })
    }

    user = new User({ name, email, password })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    // Now we create the 'payload' to send back to the client
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
      if(err) throw err
      res.json({token})
    })

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
