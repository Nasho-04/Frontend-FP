import React, { useEffect } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../GlobalContext.jsx'
import NavList from '../NavList/NavList.jsx'

const Navbar = () => {
    const { showResults, setShowResults, condicionMenu, setCondicionMenu } = useGlobalContext()
    const [search, setSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const navigate = useNavigate()
    const products = JSON.parse(sessionStorage.getItem('products'))

    const searchProduct = () => {
        if (search) {
            navigate(`/search/${search}`)
        }
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (search) {
            const filtered = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
            setFilteredProducts(filtered)
        } else {
            setFilteredProducts([])
        }
    }, [search])

    return (
        <nav className='navbar'>
            <form onSubmit={searchProduct} className='navbar-search'>
                <input placeholder='Search products...' className='navbar-search-input' type="text" value={search} onChange={handleSearch} onFocus={() => setShowResults(true)} />
                <button onClick={searchProduct} className='navbar-search-button'><i className="bi bi-search"></i></button>
                {search && showResults
                    ? <ul className='navbar-search-results'>
                        {filteredProducts.map((product) => <Link className='navbar-search-results-item-link' to={`/product/${product._id}`} key={product._id}><li className='navbar-search-results-item'>{product.name}</li></Link>)}
                    </ul>
                    : null}
            </form>
            <div className='navbar-no-responsive-container'>
                <NavList className='navbar-no-responsive-list' />
            </div>
            <div className='navbar-responsive-container' style={{ display: condicionMenu ? 'flex' : 'none' }} >
                <NavList className='navbar-responsive-list'/>
            </div>
            <span className='navbar-menu' onClick={() => setCondicionMenu(!condicionMenu)}>
                {condicionMenu
                    ? <i className="bi bi-x-lg"></i>
                    : <i className="bi bi-list"></i>}
            </span>
        </nav>
    )
}

export default Navbar
