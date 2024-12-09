import React from 'react'
import './Footer.css'
import { useGlobalContext } from '../../GlobalContext'

const Footer = () => {
const {setShowResults} = useGlobalContext()

  return (
    <footer id='footer' onClick={() => setShowResults(false)}>
      <ul className='footer-contacts'>
        <li><a href="https://github.com/Nasho-04"><i class="bi bi-github"> Github</i></a></li>
        <li><a href="https://www.linkedin.com/in/juan-ignacio-nieva-4496162aa/"><i class="bi bi-linkedin"> Linkedin</i></a></li>
        <li><i class="bi bi-envelope"></i> nachonieva04@gmail.com</li>
      </ul>
    </footer>
  )
}

export default Footer