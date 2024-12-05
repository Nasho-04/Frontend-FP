import React from 'react'
import './Footer.css'
import { useGlobalContext } from '../../GlobalContext'

const Footer = () => {
const {setShowResults} = useGlobalContext()

  return (
    <footer id='footer' onClick={() => setShowResults(false)}>
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </footer>
  )
}

export default Footer