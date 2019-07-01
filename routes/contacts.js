const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const User = require('../models/User')
const Contact = require('../models/Contact')

const router = express.Router()

// @route       GET api/contacts
// @desc        Get all users' contacts
// @access      Private
router.get('/', auth, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
    res.json(contacts)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('server error')
  }
})

// @route       POST api/contacts
// @desc        Add a new contact
// @access      Private
router.post('/',
[
  check('name', 'Name is required').trim().not().isEmpty()
],
auth,
async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, phone, type } = req.body

  try {
    const newContact = new Contact({
      name, email, phone, type, user: req.user.id
    })

    const contact = await newContact.save()
    res.status(201).json(contact)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('server error')
  }
})

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', auth, async (req, res, next) => {
  const { name, email, phone, type } = req.body

  const contactFields = {}
  if(name) contactFields.name = name
  if(email) contactFields.email = email
  if(phone) contactFields.phone = phone
  if(type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)

    if(!contact) return res.status(400).json({ msg: 'No user found' })

    // Converting tostring because user is of type ObjectID
    if(contact.user._id.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized operation' })

    // new: true will return the new document, where false (default) returns the old one
    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true })

    res.status(200).json({ contact })
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server error')
  }

})

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', auth, async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(400).json({ msg: 'User not found' })
    if(contact.user._id.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' })
    await Contact.findByIdAndRemove(req.params.id)
    res.json({ msg: 'Contact removed' })
  } catch (e) {
    console.error(`error!!!! ${e.message}`)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
