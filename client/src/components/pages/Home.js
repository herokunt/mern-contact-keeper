import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'

const Home = () => {
  return (
    <div className="columns">
      <div className="column is-6">
        <ContactForm />
      </div>
      <div className="column is-6">
        <div className="">
        </div>
        <Contacts />
      </div>
    </div>
  )
}

export default Home
