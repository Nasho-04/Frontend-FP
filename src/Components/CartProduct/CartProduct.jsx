import React from 'react'
import { Link } from 'react-router-dom'
import './CartProduct.css'
import { useState } from 'react'
import Overlay from '../Overlay/Overlay.jsx'

const CartProduct = ({ product, deleteProduct }) => {

    const [toggle, setToggle] = useState(false)

    return (
        <>
            <div className='cart-product-item' key={product._id}>
                <span className='cart-product-image'>
                    <img src={product.image} alt={product.name} />
                </span>
                <span className='cart-product-info'>
                    <Link to={`/product/${product._id}`} className='cart-product-name'>{product.name}</Link>
                    <span className='cart-product-price'>${product.price}</span>
                    <span className='cart-product-remove' onClick={() => setToggle(true)}><i className="bi bi-trash3"></i></span>
                </span>
            </div>
            <Overlay product={product} 
            toggle={toggle} 
            setToggle={setToggle} 
            btnText2='Cancel' 
            btnText1='Delete' 
            btnFunction={deleteProduct} 
            text={`Are you sure you want to delete the product ${product.name}?`} />
        </>
    )
}

export default CartProduct