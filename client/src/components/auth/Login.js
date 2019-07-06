import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {

  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { setAlert } = alertContext
  const { login, isAuthenticated, error, clearErrors, token } = authContext

  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/')
    }

    if(token){
      props.history.push('/')
    }

    if(error){
      setAlert('Invalid Login', 'is-danger')
      clearErrors()
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const { email, password } = user

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    if( email === '' || password === ''){
      setAlert('All fields are required', 'is-danger')
    } else {
      login({ email, password })
    }
  }


  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-6-desktop is-5-widescreen">
              <h1 className="title">Login</h1>
              <form className="box" onSubmit={onSubmit}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                    <input className="input" type="email" name="email" placeholder="Email Address" onChange={onChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                    <input className="input" type="password" name="password" placeholder="********" onChange={onChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox"/>
                    Rememeber Me
                  </label>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
