import React, { useEffect, useState } from 'react'
import './CartScreen.css'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import CartProduct from '../../Components/CartProduct/CartProduct.jsx'
import { useGlobalContext } from '../../GlobalContext.jsx'
import { DELETE } from '../../utils/POST.js'
import LoadingOverlay from '../../Components/LoadingOverlay/LoadingOverlay.jsx'
import Overlay from '../../Components/Overlay/Overlay.jsx'
import Footer from '../../Components/Footer/Footer.jsx'

const CartScreen = () => {
    const [total, setTotal] = useState(0)
    const [cart_products, setCart_products] = useState([])
    const [toggleBuy, setToggleBuy] = useState(false)
    const { getCart, cart, setCart, getProductById, setLoading } = useGlobalContext()

    useEffect(()=> {
        getCart()
    }, [])
    const getCartProducts = async () => {
        try {
            let sum = 0
            setLoading(true)
            for (let product of cart) {
                product = await getProductById(product.product_id)
                sum += product.price
                setTotal(sum) 
                if (!cart_products.find(item => item._id === product._id)) {
                    cart_products.push(product)
                }
            }
            setCart_products(cart_products)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCartProducts()
    }, [cart])

    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            const response = await DELETE(`https://backend-fp.vercel.app/api/cart/${id}`)
            if (response.ok) {
                setLoading(false)
                getCart()
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='cart-screen'>
            <Navbar />
            <h1 className='cart-screen-title'>Your Cart</h1>
            <div className='cart-screen-container'>
                <div className='cart-products-list'>
                    {cart_products.length === 0 && <h2 className='cart-empty'>Your cart is empty!</h2>}
                    {cart_products.map((product) => {
                        return (
                            <CartProduct product={product} key={product._id} deleteProduct={deleteProduct}/>
                        )
                    })}
                </div>
                <div className='cart-total'>
                    <span className='cart-total-text'>Total: ${total}</span>
                    <button className='buy-button' onClick={() => setToggleBuy(true)}>Buy</button>
                </div>
            </div>
            <LoadingOverlay></LoadingOverlay>
            <Overlay product={cart_products} toggle={toggleBuy} setToggle={setToggleBuy} text={'This feature is not available yet!'} btnFunction={() => setToggleBuy(false)} btnText1={'Go Back'}></Overlay>
        </div>
    )
}

export default CartScreen