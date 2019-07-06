import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import { REGISTER_SUCCESS,
REGISTER_FAIL,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
CLEAR_ERRORS } from '../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load User
  const loadUser = async () => {
    const config = {
      method: 'GET',
      headers: {
        'x-auth-token': state.token
      }
    }

    try {
      const response = await fetch('/api/auth', config)
      if(!response.ok) {
        const error = await response.json()
        throw error
      }

      const user = await response.json()
      dispatch({ type: USER_LOADED, payload: user })

    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.msg || err.errors[0].msg })
    }
  }

  // Register User
  // Proxy value in package json means we dont have to write the full URL
  const register = async userInputData => {
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInputData)
    }

    try {
      const response = await fetch('/api/users', config)
      if(!response.ok) {
        const error = await response.json()
        throw error
      }

      const {token} = await response.json()
      dispatch({ type: REGISTER_SUCCESS, payload: token })

    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.msg || err.errors[0].msg })
    }
  }

  // Login User
  const login = async userInputData => {
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInputData)
    }

    try {
      const response = await fetch('/api/auth', config)
      if(!response.ok){
        const error = await response.json()
        throw error
      }
      const {token} = await response.json()
      dispatch({ type: LOGIN_SUCCESS, payload: token })

    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.msg || err.errors[0].msg })

    }
  }

  // Logout User
  const logout = () => dispatch({ type: LOGOUT })

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }

  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: state.loading,
      error: state.error,
      loadUser,
      register,
      login,
      logout,
      clearErrors
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
