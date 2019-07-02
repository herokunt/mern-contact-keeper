import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ title, icon }) => {
  return (
    <nav className="navbar is-info">
      <h1 className="title">I'm a navbar!</h1>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps = {
  title: 'Contact Manager',
  icon: 'fas fa-id-card-alt'
}

export default Navbar
