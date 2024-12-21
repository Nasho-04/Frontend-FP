import React, { useState } from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useGlobalContext } from '../../GlobalContext.jsx'
import { GET } from '../../utils/POST.js'

const Cart = () => {
    const { setCount, count, getCart, cart, setCart } = useGlobalContext()

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        setCount(cart.length)
    }, [cart])

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