import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext)
  const { deleteContact, setCurrent, clearCurrent } = contactContext

  const {id, name, email, phone, type } = contact

  const onDelete = () => {
    deleteContact(contact.id)
    clearCurrent()
  }

  return (
    <div className="card my-1">
      <header className="card-header">
        <h3 className="card-header-title">{name}</h3>
        <p className="card-header-icon">
          <span className={"tag " + (type === "professional" ? "is-link" : "is-success")}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </p>
      </header>
      <div className="card-content">
        <p className="is-size-6">{email}</p>
        <p className="is-size-6">{phone}</p>
        <div className="field is-grouped mt-1">
          <div className="control">
            <button className="button is-small is-dark" onClick={() => setCurrent(contact)}>Edit</button>
          </div>
          <div className="control">
            <button className="button is-small is-danger" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactItem
