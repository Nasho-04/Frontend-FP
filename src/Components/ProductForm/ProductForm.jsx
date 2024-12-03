import React from 'react'
import './ProductForm.css'
import { useGlobalContext } from '../../GlobalContext.jsx'

const ProductForm = ({ handleSubmitCreateProductForm, handleChangeFile, image }) => {

    return (
        <form className='create-product-form' onSubmit={handleSubmitCreateProductForm}>
            <div className='create-product-left'>
                <div className='create-product-field'>
                    <label htmlFor="name">Name: </label>
                    <input className='create-product-input' type="text" id="name" name="name" required maxLength="25" />
                </div>
                <div className='create-product-field'>
                    <label htmlFor="price">Price: </label>
                    <input className='create-product-input' type="number" id="price" name="price" required />
                </div>
                <div className='create-product-field'>
                    <label htmlFor="category-create">Category: </label>
                    <select name="category" id="category-create">
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home">Home</option>
                        <option value="Toys">Toys</option>
                        <option value="Books">Books</option>
                        <option value="Health">Health</option>
                        <option value="Beauty">Beauty</option>
                    </select>
                </div>
                <div className='button-container'>
                    <button className='create-product-button confirm' type="submit">Confirm Product</button>
                    <div onClick={() => window.location.reload()} type="reset" className='create-product-button cancel'>Reset</div>
                </div>
            </div>
            <div className='create-product-right'>
                <div className='create-product-field'>
                    <label htmlFor="stock">Stock: </label>
                    <input className='create-product-input' type="number" id="stock" name="stock" required />
                </div>
                <div className='create-product-field image'>
                    <label htmlFor="image">Image: </label>
                    <input className='create-product-image' type="file" id="image" name="image" onChange={handleChangeFile} required />
                    {image
                        ?
                        <span><i className="bi bi-check2"></i></span>
                        : null
                        }
                </div>
                <div className='create-product-field'>
                    <label htmlFor="description">Description: </label>
                    <textarea rows="5" cols="50" maxLength={"255"} className='create-product-textarea' type="text" id="description" name="description" required />
                </div>
            </div>
        </form>
    )
}

export default ProductForm