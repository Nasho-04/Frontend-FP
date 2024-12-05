import React from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '../../GlobalContext.jsx'

const Cart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    const { setCount, count } = useGlobalContext()

    useEffect(() => {
        setCount(cart.length)
    }, [cart])

    return (
        <Link to='/cart' className="cart">
            <i className="bi bi-cart2"></i>
            <span className="cart-count">{count}</span>
        </Link>
    )
}

export default Cart