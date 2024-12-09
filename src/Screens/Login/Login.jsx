import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { POST } from '../../utils/POST.js'
import { extractFormData } from '../../utils/ExtractData.js'

const Login = () => {
    const navigate = useNavigate()
    const handleSubmitLoginForm = async (e) => {
        try {
            e.preventDefault()
            const form_HTML = e.target
            const form_Values = new FormData(form_HTML)
            const form_fields = {
                'email': '',
                'password': ''
            }
            const form_values_object = extractFormData(form_fields, form_Values)
            const response = await POST('https://backend-fp.vercel.app/api/auth/login', form_values_object)
            if (response.ok) {
                const access_token = response.payload.token
                sessionStorage.setItem('access_token', access_token)
                sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
                sessionStorage.setItem('cart', JSON.stringify([]))
                navigate('/home')
            }
            else {
                const error_message = response.message
                const error_span = document.querySelector('.login-error')
                error_span.textContent = error_message
            }
        }
        catch (error) {
        }
    }

    return (
        <div className='login-screen'>
            <div className='login-container'>
                <form onSubmit={handleSubmitLoginForm} className='login-form'>
                    <h1 className='login-title'>Login</h1>
                    <div className='login-form-field'>
                        <label htmlFor="email">Email:</label>
                        <input className='login-input' type="email" id="email" name="email" required />
                    </div>
                    <div className='login-form-field'>
                        <label htmlFor="password">Password:</label>
                        <input className='login-input' type="password" id="password" name="password" required />
                    </div>
                    <span className='login-error'></span>
                    <div className='login-button-container'>
                        <button className='login-button' type="submit">Submit</button>
                    </div>
                </form>
                <div className='login-link-container'>
                    <span className='login-span'>If you don't have an account, <a className='login-link' href="/register">Register</a></span>
                    <span className='login-span'>If you forgot your password, <a className='login-link' href="/forgot-password">Forgot Password</a></span>
                </div>
            </div>
        </div>
    )
}

export default Login