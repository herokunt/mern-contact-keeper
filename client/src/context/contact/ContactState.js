import React, { useReducer, useContext } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
ADD_CONTACT,
CONTACT_ERROR,
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
    contacts: [],
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)

  // Add Contact
  const addContact = async contact => {

    const token = localStorage.getItem('token')
    const config = {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'content-type': 'application/json'
      },
      body: JSON.stringify(contact)
    }
    try {
      const response = await fetch('/api/contacts')
      if(!response.ok){
        const error = await response.json()
        throw error
      }
      const newContact = await response.json()

      dispatch({ type: ADD_CONTACT, payload: newContact })

    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.msg || err.errors[0].msg })
    }
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Update Current Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // Cear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter
    }}>
      { props.children }
    </ContactContext.Provider>
  )
}

export default ContactState
