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

  const authView = (
    <Fragment>
      <div className="navbar-item has-dropdown is-hoverable">
        <div className="navbar-link">
          {user && (user.name)}
        </div>
        <div className="navbar-dropdown">
          <a className="navbar-item">
            <span className="has-icon-left">
              <i className="fas fa-sign-out-alt"></i>Profile
            </span>
          </a>
          <a className="navbar-item">
            <span className="has-icon-left">
              <i className="fas fa-sign-out-alt"></i>Report Bug
            </span>
          </a>
          <a className="navbar-item" onClick={onLogout}>
            <span className="has-icon-left">
              <i className="fas fa-sign-out-alt"></i>Logout
            </span>
          </a>
        </div>
      </div>
    </Fragment>
  )

  const guestView = (
    <Fragment>
      <div className="navbar-item">
        <a href="/login" className="button">Login</a>
      </div>
      <div className="navbar-item">
        <a href="/register" className="button">Register</a>
      </div>
    </Fragment>
  )

  return (
    <nav className="navbar has-shadow">
      <div className="navbar-brand">

        <a href="#" className="navbar-item">
          {icon}
        </a>
        <div className="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <small>{title}</small>
          </div>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? authView : guestView }
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps = {
  title: 'A Modern Contact Manager',
  icon: 'fas fa-id-card-alt'
}

export default Navbar
