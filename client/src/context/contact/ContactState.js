import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import uuid from 'uuid'
import {
ADD_CONTACT,
DELETE_CONTACT,
SET_CURRENT,
CLEAR_CURRENT,
UPDATE_CONTACT,
FILTER_CONTACTS,
CLEAR_FILTER,
SET_ALERT,
REMOVE_ALERT } from '../types'

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Harry Potter',
        email: 'pottermaster@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Arya Stark',
        email: 'girlnoname@gmail.com',
        phone: '222-222-2222',
        type: 'professional'
      },
      {
        id: 3,
        name: 'Dark Phoenix',
        email: 'mastermind@gmail.com',
        phone: '333-333-333',
        type: 'professional'
      },
    ]
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4()
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Current Contact

  // Filter Contacts

  // Cear Filter

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      addContact
    }}>
      { props.children }
    </ContactContext.Provider>
  )
}

export default ContactState
