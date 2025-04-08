import React from 'react'
import './Footer.css'
import { useGlobalContext } from '../../GlobalContext.jsx'

const Footer = () => {
const {setShowResults} = useGlobalContext()

  return (
    <footer id='footer' onClick={() => setShowResults(false)}>
      <ul className='footer-contacts'>
        <li><a href="https://github.com/Nasho-04" target='_blank'><i className="bi bi-github"></i>Github</a></li>
        <li><a href="https://www.linkedin.com/in/juan-ignacio-nieva-4496162aa/" target='_blank' ><i className="bi bi-linkedin"></i>Linkedin</a></li>
        <li><i className="bi bi-envelope"></i> nachonieva04@gmail.com</li>
      </ul>
    </footer>
  )
}

export default Footer