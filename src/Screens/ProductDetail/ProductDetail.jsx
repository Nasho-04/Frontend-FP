import React from 'react'
import { useParams } from 'react-router-dom'
import { GET, PUT, DELETE } from '../../utils/POST'
import { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import './ProductDetail.css'
import { extractFormData } from '../../utils/ExtractData.js'
import { useGlobalContext } from '../../GlobalContext.jsx'
import Cart from '../../Components/Cart/Cart.jsx'
import Overlay from '../../Components/Overlay/Overlay.jsx'
import { useNavigate } from 'react-router-dom'

const ProductDetail = () => {
    const { product_id } = useParams()
    const [product, setProduct] = useState({})
    const { image, handleChangeFile, setImage } = useGlobalContext()
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
    const authorized = product.seller_id === user_info.id  || user_info.role === 'admin'
    const [editMode, setEditMode] = useState(false)
    const [toggleAdd, setToggleAdd] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [editConfirm, setEditConfirm] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const getProduct = async () => {
            const response = await GET(`http://localhost:2000/api/products/${product_id}`)
            const data = response.payload.details
            setProduct(data)
        }
        getProduct()
    }, [product_id])

    const handleSubmitEditProductForm = async (e) => {
        try {
            e.preventDefault()
            const formHTML = e.target
            const formValues = new FormData(formHTML)
            const formFields = {
                'name': '',
                'price': '',
                'category': '',
                'stock': '',
                'description': ''
            }
            const formValuesObject = extractFormData(formFields, formValues)
            formValuesObject.image = image
            const response = await PUT(`http://localhost:2000/api/products/edit/${product_id}`, formValuesObject)
            setImage('')
            setEditConfirm(true)
            setEditMode(false)
            console.log(response)
            if (response.ok) {
                console.log(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async (product_id) => {
        const response = await DELETE(`http://localhost:2000/api/products/${product_id}`)
        if (response.ok) {
            setToggleDelete(false)
            setDeleteConfirm(true)
        }
    }

    const addToCart = () => {
        const cart = JSON.parse(sessionStorage.getItem('cart'))
        let included = false
        for (const item in cart) {
            if (cart[item]._id === product_id) {
                included = true
            }
        }
        if (!included) {
            cart.push(product)
            sessionStorage.setItem('cart', JSON.stringify(cart))
            window.location.reload()
        }
    }

    return (
        <>
        <Navbar />
        <div className='product-detail-screen'>
            <div className='product-detail-container'>
                <div className='product-detail-image-container'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='product-detail-info-container'>
                    <h1 className='product-detail-title'>{product.name}</h1>
                    <span className='product-detail-price'>${product.price}</span>
                    <p className='product-detail-stock'>Available stock: {product.stock}</p>
                    <p className='product-detail-description'>{product.description}</p>
                    <div className='product-detail-button-container'>
                        {authorized && <button className='product-detail-button' onClick={() => setToggleAdd(true)}>Add to Cart</button>}
                        {authorized && <button className='product-detail-button edit-button' onClick={() => setEditMode(!editMode)}>Edit Product</button>}
                        {authorized && <button className='product-detail-button delete-button' onClick={() => setToggleDelete(true)}>Delete Product</button>}
                    </div>
                </div>
            </div>
            {/* FORM */}
            <div className='product-detail-form-container' style={{ display: editMode ? 'flex' : 'none' }}>
                <h2 className='product-detail-form-title'>Update Your Product</h2>
                <form onSubmit={handleSubmitEditProductForm} action="" className='edit-product-form'>
                    <div className='edit-product-left'>
                        <div className='edit-product-field'>
                            <label htmlFor="name">Name: </label>
                            <input className='edit-product-input' type="text" id="name" name="name" required maxLength="25" />
                        </div>
                        <div className='edit-product-field'>
                            <label htmlFor="price">Price: </label>
                            <input className='edit-product-input' type="number" id="price" name="price" />
                        </div>
                        <div className='edit-product-field'>
                            <label htmlFor="category">Category: </label>
                            <select name="category" id="category">
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home">Home</option>
                                <option value="Toys">Toys</option>
                                <option value="Books">Books</option>
                                <option value="Health">Health</option>
                                <option value="Beauty">Beauty</option>
                            </select>
                        </div>
                        <div className='edit-button-container'>
                            <button className='edit-product-button confirm' type="submit">Confirm Product</button>
                            <div onClick={() => window.location.reload()} type="reset" className='edit-product-button cancel'>Reset</div>
                        </div>
                    </div>
                    <div className='edit-product-right'>
                        <div className='edit-product-field'>
                            <label htmlFor="stock">Stock: </label>
                            <input className='edit-product-input' type="number" id="stock" name="stock" required />
                        </div>
                        <div className='edit-product-field edit-image'>
                            <label htmlFor="image">Image: </label>
                            <input className='edit-product-image' type="file" id="image" name="image" onChange={handleChangeFile} required />
                            {image
                                ?
                                <span><i className="bi bi-check2"></i></span>
                                : null
                            }
                        </div>
                        <div className='edit-product-field'>
                            <label htmlFor="description">Description: </label>
                            <textarea rows="5" cols="50" maxLength={"255"} className='edit-product-textarea' type="text" id="description" name="description" required />
                        </div>
                    </div>
                </form>
            </div>
            <Cart />
            <Overlay toggle={toggleAdd} setToggle={setToggleAdd} product={product} btnFunction={addToCart} btnText1="Confirm" btnText2="Cancel" text="Are you sure you want to add this product?" />
            <Overlay toggle={toggleDelete} setToggle={setToggleDelete} product={product} btnFunction={handleDeleteProduct} btnText1="Confirm" btnText2="Cancel" text="Are you sure you want to delete this product?" />
            <Overlay toggle={deleteConfirm} setToggle={setDeleteConfirm} product={product} btnFunction={() => navigate(`/home`)} btnText1="Go Home" text="Product deleted successfully!" />
            <Overlay toggle={editConfirm} setToggle={setEditConfirm} product={product} btnFunction={() => navigate(`/home`)} btnText1="Go Home" text="Product updated successfully!" />
        </div>
        </>
    )
}

export default ProductDetail