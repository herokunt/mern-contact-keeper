import React, { useState } from 'react'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    console.log(user)
  }

  const { email, password } = user

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
