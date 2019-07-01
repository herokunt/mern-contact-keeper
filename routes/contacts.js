const express = require('express')
const router = express.Router()

// @route       GET api/contacts
// @desc        Get all users' contacts
// @access      Private
router.get('/', (req, res, next) => {
  res.send('Get all contacts for a user')
})

// @route       POST api/contacts
// @desc        Add a new contact
// @access      Private
router.post('/', (req, res, next) => {
  res.send('Add contact')
})

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', (req, res, next) => {
  res.send('Update contact')
})

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', (req, res, next) => {
  res.send('Delete contact')
})

module.exports = router