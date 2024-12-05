import React from 'react'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Main from '../../Components/Main/Main.jsx'
import { useEffect } from 'react'
import './Home.css'
import { useGlobalContext } from '../../GlobalContext.jsx'
import Cart from '../../Components/Cart/Cart.jsx'

const Home = () => {
  const {products, getProducts } = useGlobalContext()

  useEffect(() => {
    getProducts()
  }, [products])


  return (
    <div className='home-container'>
      <Navbar />
      <Main className='home-main' />
      <Cart />
    </div>
  )
}

export default Home