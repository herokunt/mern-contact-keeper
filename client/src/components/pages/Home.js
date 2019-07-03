import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'

const Home = () => {
  return (
    <div className="columns">
      <div className="column is-6">
        <ContactForm />
      </div>
      <div className="column is-6">
        <div className="">
        </div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
