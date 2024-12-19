import React from 'react'
import { useParams } from 'react-router-dom'
import { GET, PUT, DELETE, POST } from '../../utils/POST'
import { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import './ProductDetail.css'
import { extractFormData } from '../../utils/ExtractData.js'
import { useGlobalContext } from '../../GlobalContext.jsx'
import Cart from '../../Components/Cart/Cart.jsx'
import Overlay from '../../Components/Overlay/Overlay.jsx'
import { useNavigate } from 'react-router-dom'
import LoadingOverlay from '../../Components/LoadingOverlay/LoadingOverlay.jsx'

const ProductDetail = () => {
    const { product_id } = useParams()
    const [product, setProduct] = useState("")
    const { image, handleChangeFile, setImage, loading, setLoading, categories } = useGlobalContext()
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
    const authorized = product.seller_id === user_info.id || user_info.role === 'admin'
    const [editMode, setEditMode] = useState(false)
    const [toggleAdd, setToggleAdd] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [editConfirm, setEditConfirm] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [cart, setCart] = useState([])

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await GET('https://backend-fp.vercel.app/api/products/cart/')
                if (response.ok) {
                    const cart = response.payload.details
                    return setCart(cart)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getCart()
    }, [])

    const navigate = useNavigate()

    useEffect(() => {
        const getProduct = async () => {
            const response = await GET(`https://backend-fp.vercel.app/api/products/${product_id}`)
            const data = response.payload.details
            setProduct(data)
            setName(data.name)
            setPrice(data.price)
            setCategory(data.category)
            setStock(data.stock)
            setDescription(data.description)
        }
        getProduct()
    }, [product_id])

    const handleSubmitEditProductForm = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
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
            const response = await PUT(`https://backend-fp.vercel.app/api/products/edit/${product_id}`, formValuesObject)
            setImage('')
            if (response.ok) {
                setLoading(false)
                setEditConfirm(true)
                setEditMode(false)
            }
            else {
                setLoading(false)
                const error_message = response.message
                const error_span = document.querySelector('.edit-product-error')
                error_span.textContent = error_message
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async (product_id) => {
        setLoading(true)
        const response = await DELETE(`https://backend-fp.vercel.app/api/products/${product_id}`)
        if (response.ok) {
            setLoading(false)
            setToggleDelete(false)
            setDeleteConfirm(true)
        }
        else {
            setLoading(false)
        }
    }

    const addToCart = (product_id) => {
        let included = false
        for (const item in cart) {
            if (cart[item]._id == product_id) {
                included = true
            }
        }
        if (!included) {
            const response = POST(`https://backend-fp.vercel.app/api/cart/${product_id}`)
            if (response.ok) {
                setCart([...cart, product])
            }
        }
    }

    return (
        <>
            <Navbar />
            <LoadingOverlay />
            <div className='product-detail-screen'>
                <div className='product-detail-container'>
                    {product
                        ? <>
                            <div className='product-detail-image-container'>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className='product-detail-info-container'>
                                <span>
                                    <h1 className='product-detail-title'>{product.name}</h1>
                                    <span className='product-detail-price'>ARS ${product.price}</span>
                                    <p className='product-detail-stock'>Available stock: {product.stock}</p>
                                    <p className='product-detail-description'>{product.description}</p>
                                </span>
                                <div className='product-detail-button-container'>
                                    {!authorized && <button className='product-detail-button' onClick={() => setToggleAdd(true)}>Add to Cart</button>}
                                    {authorized && <button className='product-detail-button edit-button' onClick={() => setEditMode(!editMode)}>Edit Product</button>}
                                    {authorized && <button className='product-detail-button delete-button' onClick={() => setToggleDelete(true)}>Delete Product</button>}
                                </div>
                            </div>
                        </>
                        :
                        <div className='loading-container'>
                            <span className='loading-spinner'></span>
                        </div>
                    }
                </div>
                {/* FORM */}
                <div className='product-detail-form-container' style={{ display: editMode ? 'flex' : 'none' }}>
                    <h2 className='product-detail-form-title'>Update Your Product</h2>
                    <span className='edit-product-error'></span>
                    <form onSubmit={handleSubmitEditProductForm} action="" className='edit-product-form'>
                        <div className='edit-product-left'>
                            <div className='edit-product-field'>
                                <label htmlFor="name">Name: </label>
                                <input className='edit-product-input' type="text" id="name" name="name" required maxLength="25" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='edit-product-field'>
                                <label htmlFor="price">Price: </label>
                                <input className='edit-product-input' type="number" id="price" name="price" required min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='edit-product-field'>
                                <label htmlFor="category">Category: </label>
                                <select name="category" id="category" required value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map((category) => <option value={category} key={category}>{category}</option>)}
                                </select>
                            </div>
                            <div className='edit-button-container'>
                                <button className='edit-product-button confirm' type="submit">Confirm Product</button>
                                <div onClick={() => setEditMode(false)} type="reset" className='edit-product-button cancel'>Cancel</div>
                            </div>
                        </div>
                        <div className='edit-product-right'>
                            <div className='edit-product-field'>
                                <label htmlFor="stock">Stock: </label>
                                <input className='edit-product-input' type="number" id="stock" name="stock" required min="0" max="100" value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>
                            <div className='edit-product-field edit-image'>
                                <label htmlFor="image">Image: </label>
                                <input className='edit-product-image' type="file" id="image" name="image" onChange={handleChangeFile} required  />
                                {image
                                    ?
                                    <span><i className="bi bi-check2"></i></span>
                                    : null
                                }
                            </div>
                            <div className='edit-product-field'>
                                <label htmlFor="description">Description: </label>
                                <textarea rows="5" cols="50" maxLength={"255"} className='edit-product-textarea' type="text" id="description" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
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