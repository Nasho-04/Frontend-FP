import React from 'react'
import './SearchProduct.css'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../GlobalContext.jsx'
import { Link } from 'react-router-dom'
import Cart from '../../Components/Cart/Cart.jsx'

const SearchProduct = () => {
    const { search } = useParams()
    const { products, showResults, setShowResults } = useGlobalContext()
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='search-product-screen'>
            <Navbar />
            <div className='search-product-container' onClick={() => setShowResults(false)}>
                {filteredProducts.length > 0 
                ?
                filteredProducts.map((product) => <Link className='search-product-item-link' to={`/product/${product._id}`} key={product._id}>
                        <div className='search-product-item-image' onClick={() => setShowResults(false)}>
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className='search-product-item-info'>
                            <h2 className='search-product-item-name'>{product.name}</h2>
                            <span className='search-product-item-price'>${product.price}</span>
                        </div>
                    </Link>)
            : <div className='no-products-found'>
                <h2>No products found</h2>
                <p>Try searching for something else</p>
            </div>
            }
            </div>
            <Cart />
        </div>
    )
}

export default SearchProduct