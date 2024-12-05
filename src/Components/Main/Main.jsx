import React from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import Footer from '../Footer/Footer.jsx'
import { useGlobalContext } from '../../GlobalContext.jsx'

const Main = () => {
    const { products, setShowResults } = useGlobalContext()
    const products_list = products.filter((product) => product.active === true)

    return (
        <>
            <main className='main'  onClick={() => setShowResults(false)}>
                <h1 className='main-title'>Our products</h1>
                <ul className='product-list'>
                    {products
                        ?
                        products_list.map((product) => (
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
                        :
                        <span>Loading...</span>
                    }
                </ul>
            </main>
            <Footer />
        </>
    )
}

export default Main