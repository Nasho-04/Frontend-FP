import React, { useState } from 'react'
import { extractFormData } from '../../utils/ExtractData.js'
import { POST } from '../../utils/POST.js'
import './ForgotPassword.css'
import Overlay from '../../Components/Overlay/Overlay.jsx'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)

  const handleSubmitForgotPasswordForm = async (e) => {
    try {
      e.preventDefault()
      const formHTML = e.target
      const formValues = new FormData(formHTML)
      const formFields = {
        'email': ''
      }
      const formValuesObject = await extractFormData(formFields, formValues)
      const response = await POST('https://backend-fp.vercel.app/api/auth/forgot-password', formValuesObject)
      if (response.ok) {
        // ACTIVATE SOMETHING THAT SAYS "EMAIL SENT SUCCESSFULLY"
      }
      else {
        const error_message = response.message
        const error_span = document.querySelector('.forgot-password-error')
        error_span.textContent = error_message
      }
    } catch (error) {

    }
  }

  return (
    <div className='forgot-password-screen'>
      <div className='forgot-password-container'>
        <div className='forgot-password-header'>
          <h1 className='forgot-password-title'>Forgot Password</h1>
          <p className='forgot-password-description'>We will send you an email to reset your password</p>
        </div>
        <form className='forgot-password-form' onSubmit={handleSubmitForgotPasswordForm}>
          <div className='forgot-password-field'>
            <label htmlFor="email">Email:</label>
            <input className='forgot-password-input' type="email" id="email" name="email" required />
            <span className='forgot-password-error'></span>
          </div>
          <button className='forgot-password-button' type="submit" onClick={() => setToggle(true)}>Send</button>
        </form>
        <div className='forgot-password-link-container'>
          <span>Back to <a className='forgot-password-link' href="/login">Login</a></span>
        </div>
      </div>
      <Overlay product={{}} text={'Email sent successfully!'} btnFunction={() => navigate('/login')} btnText1={'Go to login'} toggle={toggle} setToggle={setToggle} />
    </div>
  )
}

export default ForgotPassword