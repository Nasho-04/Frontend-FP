import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Main from '../../Components/Main/Main.jsx'
import { useEffect } from 'react'
import './Home.css'
import Cart from '../../Components/Cart/Cart.jsx'
import { GET } from '../../utils/POST.js'

const Home = () => {
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    try {
        const response = await GET('https://backend-fp.vercel.app/api/products/')
        if (response.ok) {
            const products_list = response.payload.details
            setProducts(products_list)
            sessionStorage.setItem('products', JSON.stringify(products_list))
        }
    } catch (error) {
        console.log(error)
    }
}
  useEffect(() => {
    getProducts()
  }, [])


  return (
    <div className='home-container'>
      <Navbar />
      <Main className='home-main' products={products} />
      <Cart />
    </div>
  )
}

export default Home