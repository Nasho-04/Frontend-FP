import React from 'react'
import { extractFormData } from '../../utils/ExtractData.js'
import { PUT } from '../../utils/POST.js'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import './ResetPassword.css'

const ResetPassword = () => {

  const [ togglescreen, setTogglescreen ] = useState(false)

  const { reset_token } = useParams()
  const handleSubmitResetPasswordForm = async (e) => {
    try {
      e.preventDefault()
      const formHTML = e.target
      const formValues = new FormData(formHTML)
      const formFields = {
        'password': ''
      }
      const formValuesObject = await extractFormData(formFields, formValues)
      const response = await PUT('https://backend-fp.vercel.app/api/auth/reset-password/' + reset_token, formValuesObject)
      if (response.ok) {
        console.log(response)
        setTogglescreen(true)
      }
      else {
        const error_message = response.message
        const error_span = document.querySelector('.reset-password-error')
        error_span.textContent = error_message
      }
    } catch (error) {

    }
  }

  return (
    <div className='reset-password-screen'>
      <div className='reset-password-container'>
        <div className='reset-password-header'>
          <h1 className='reset-password-title'>Reset Password</h1>
          <p className='reset-password-subtitle'>Enter your new password below.</p>
        </div>
        <form className='reset-password-form' onSubmit={handleSubmitResetPasswordForm}>
          <div className='reset-password-field'>
            <label htmlFor="password">New Password:</label>
            <input className='reset-password-input' type="password" id="password" name="password" required />
            <span className='reset-password-error'></span>
          </div>
          <div className='reset-password-button-container'>
          <button className='reset-password-button' type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <div className='reset-password-success' style={{ display: togglescreen ? 'flex' : 'none' }}>
        <h2>Password Reset Successful!</h2>
        <p>You can now log in with your new password.</p>
        <Link className='reset-password-link' to='/login'>Go to Login screen.</Link>
      </div>
    </div>

  )
}

export default ResetPassword