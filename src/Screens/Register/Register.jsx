import React from 'react'
import { useNavigate } from 'react-router-dom'
import { extractFormData } from '../../utils/ExtractData'
import { POST } from '../../utils/POST.js'
import './Register.css'
import { useGlobalContext } from '../../GlobalContext.jsx'
import LoadingOverlay from '../../Components/LoadingOverlay/LoadingOverlay.jsx'

const Register = () => {
  const navigate = useNavigate()
  const { loading, setLoading } = useGlobalContext()
  const handleSubmitRegisterForm = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const form_HTML = e.target
      const form_Values = new FormData(form_HTML)
      const form_fields = {
        'name': '',
        'email': '',
        'password': ''
      }
      const form_values_object = extractFormData(form_fields, form_Values)
      const response = await POST('https://backend-fp.vercel.app/api/auth/register', form_values_object)
      if (response.ok) {
        setLoading(false)
        navigate('/')
      }
      else {
        setLoading(false)
        const error_message = response.message
        const error_span = document.querySelector('.register-error')
        error_span.textContent = error_message
      }
    }
    catch (error) {
      //manejan sus errores
    }
  }



  return (
    <div className='register-screen'>
      <div className='register-container'>
        <h1 className='register-title'>Register</h1>
        <form onSubmit={handleSubmitRegisterForm} className='register-form'>
          <div className='register-form-field'>
            <label htmlFor="name">Name:</label>
            <input className='register-input' type="text" id='name' name='name' />
          </div>
          <div className='register-form-field'>
            <label htmlFor="email">Email:</label>
            <input className='register-input' type="email" id='email' name='email' />
          </div>
          <div className='register-form-field'>
            <label htmlFor="password">Password:</label>
            <input className='register-input' type="password" id='password' name='password' />
          </div>
          <span className='register-error'></span>
          <button type='submit' className='register-button'>Register</button>
        </form>
        <div className='register-link-container'>
          <span>Already have an account? <a className='register-link' href="/login">Login</a></span>
        </div>
      </div>
      <LoadingOverlay />
    </div>
  )
}

export default Register