import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import Footer from '../Footer/Footer.jsx'
import { useGlobalContext } from '../../GlobalContext.jsx'

const Main = ({ products }) => {
    const { setShowResults } = useGlobalContext()
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        setProductsList(products.filter((product) => product.active === true))
    }, [products])

    return (
        <>
            <main className='main' onClick={() => setShowResults(false)}>
                <h1 className='main-title'>Our products</h1>
                <ul className='product-list'>
                    {products.length > 0
                        ? productsList.map((product) => (
                            product.active === true ?
                                <li className='product-item' key={product._id}>
                                    <Link className='product-item-link' to={`/product/${product._id}`}>
                                        <img src={product.image} alt={product.name} />
                                        <div className='product-item-info'>
                                            <h2 maxLength="20">{product.name}</h2>
                                            <span>${product.price}</span>
                                        </div>
                                    </Link>
                                </li>
                                : null
                        ))
                        : <div className='loading'>
                            <span className="loader"></span>
                        </div>
                    }
                </ul>
            </main>
            <Footer />
        </>
    )
}

export default Main