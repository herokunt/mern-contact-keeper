import React, { useState, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
  const contactContext = useContext(ContactContext)

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })

  const { name, email, phone, type } = contact

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    contactContext.addContact(contact)
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    })
  }

  return (
    <form className="mt-1" onSubmit={onSubmit}>
      <div className="field">
      <div className="label has-text-centered is-size-4">Add Contact</div>
        <div className="control mt-1">
          <input className="input" name="name" type="text" placeholder="Contact name" value={name} onChange={onChange} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input className="input" name="email" type="email" placeholder="Email address" value={email} onChange={onChange} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input className="input" name="phone" type="text" placeholder="Phone number" value={phone} onChange={onChange} />
        </div>
      </div>
        <div className="field">
          <div className="control">
            <label className="radio">
              <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} />
              Personal
            </label>
            <label className="radio">
              <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} />
              Professional
            </label>
          </div>
      </div>
      <button className="button is-primary">Add Contact</button>
    </form>
  )
}

export default ContactForm
