const express = require('express')
const router = express.Router()

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', (req, res, next) => {
  res.send('Get logged in user')
})

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post('/', (req, res, next) => {
  res.send('Authenticate and login user')
})

module.exports = router
