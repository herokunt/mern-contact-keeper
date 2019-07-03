import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
import ContactFilter from '../contacts/ContactFilter'

const Contacts = (props) => {
  const contactContext = useContext(ContactContext)
  const { contacts, filtered } = contactContext

  if(contacts.length === 0){
    return <h4 className="is-size-4">Add a contact now!</h4>
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null ? filtered.map(contact => (
          <CSSTransition key={contact.id} timeout={400} classNames="item">
            <ContactItem contact={contact} />
          </CSSTransition>
        ))
        : contacts.map(contact => (
          <CSSTransition key={contact.id} timeout={400} classNames="item">
            <ContactItem key={contact.id} contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  )
}

export default Contacts

/*
  Note that it is classNames with an 's' at the end. This is just how transitions work.
  Also note that the key when rendering a list of items this way (with map) has to be added
  to the direct or first element, which in this case, because of the transitions, is CSSTransition
*/
