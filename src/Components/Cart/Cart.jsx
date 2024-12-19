import React, { useState } from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useGlobalContext } from '../../GlobalContext.jsx'
import { GET } from '../../utils/POST.js'

const Cart = () => {
    const { setCount, count } = useGlobalContext()
    const [cart, setCart] = useState([])

    const getCart = async () => {
        try {
            const response = await GET('https://backend-fp.vercel.app/api/products/cart')
            if (response.ok) {
                const cart = response.payload.details
                for (const item in cart) {
                    if (item.user_id === JSON.parse(sessionStorage.getItem('user_info')).id) {
                        setCart(...cart, item)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        setCount(cart.length)
    }, [cart])

    console.log(cart)

    return (
        <div className='cart'>
            <Link to='/cart' className="cart-link">
                <i className="bi bi-cart2"></i>
                <span className="cart-count">{count}</span>
            </Link>
        </div>
    )
}

export default Cart