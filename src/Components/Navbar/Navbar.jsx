import React from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../GlobalContext.jsx'

const Navbar = () => {
    const { products } = useGlobalContext()
    const [search, setSearch] = useState('')
    const [showResults, setShowResults] = useState(false)
    const logout = () => {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('user_info')
        sessionStorage.removeItem('cart')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <nav className='navbar'>
            <div className='navbar-search'>
                <input placeholder='Search products...' className='navbar-search-input' type="text" value={search} onChange={handleSearch} onFocus={ () => setShowResults(true)} onBlur={() => setShowResults(false)}/>
                <button className='navbar-search-button'><i className="bi bi-search"></i></button>
                {search && showResults
                    ? <ul className='navbar-search-results'>
                        {filteredProducts.map((product) => <Link className='navbar-search-results-item-link' to={`/product/${product._id}`} key={product._id}><li className='navbar-search-results-item'>{product.name}</li></Link>)}
                    </ul>
                    : null}
            </div>
            <div className='navbar-list-container'>
                <ul className='navbar-list'>
                    <li><Link to='/home'>Home</Link></li>
                    <li><a href="#footer">Contact</a></li>
                    <li><Link to='/product/new'>Add Product</Link></li>
                    <li><Link to='/' onClick={logout}>Logout</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
