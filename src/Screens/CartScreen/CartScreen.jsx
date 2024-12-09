import React, { useEffect, useState } from 'react'
import './CartScreen.css'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import CartProduct from '../../Components/CartProduct/CartProduct.jsx'

const CartScreen = () => {
    const [total, setTotal] = useState(0)
    const cart_list = JSON.parse(sessionStorage.getItem('cart'))

    useEffect(() => {
        let sum = 0
        cart_list.forEach((product) => {
            sum += product.price
        })
        setTotal(sum)
    }, [cart_list])

    const deleteProduct = (id) => {
        cart_list.splice(cart_list.findIndex(product => product._id === id), 1)
        sessionStorage.setItem('cart', JSON.stringify(cart_list))
        window.location.reload()
    }

    return (
        <div className='cart-screen'>
            <Navbar />
            <h1 className='cart-screen-title'>Your Cart</h1>
            <div className='cart-screen-container'>
                <div className='cart-products-list'>
                    {cart_list.length === 0 && <h2 className='cart-empty'>Your cart is empty!</h2>}
                    {cart_list.map((product) => {
                        return (
                            <CartProduct product={product} key={product._id} deleteProduct={deleteProduct} />
                        )
                    })}
                </div>
                <div className='cart-total'>
                    <span className='cart-total-text'>Total: ${total}</span>
                    <button className='buy-button'>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default CartScreen