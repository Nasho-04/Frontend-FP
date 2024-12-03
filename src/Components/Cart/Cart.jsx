import React from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Cart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount(cart.length)
    }, [cart.length])

    return (
        <Link to='/cart' class="cart">
            <i class="bi bi-cart2"></i>
            <span class="cart-count">{count}</span>
        </Link>
    )
}

export default Cart