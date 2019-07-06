import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <section className="section">
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
    </section>
  )
}

export default Home
