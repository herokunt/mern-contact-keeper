import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth/authContext'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, logout, user } = authContext

  const onLogout = () => {
    logout()
  }

  return (
    <nav className="navbar is-info">
      <h1 className="title">I'm a navbar!</h1>

      {user && (
        <Fragment>
          <button className="button is-success is-outlined">New</button>
          <Link to='/'>Profile</Link>
          <a onClick={onLogout} to='/logout'>Logout</a>
        </Fragment>
      )}

      {!user && (<Fragment>Logout</Fragment>)}
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
