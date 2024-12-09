import React from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useGlobalContext } from '../../GlobalContext.jsx'

const Cart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    const { setCount, count } = useGlobalContext()

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