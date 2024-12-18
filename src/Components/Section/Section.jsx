import React from 'react'
import './Section.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Section = ({ category_array, category_name }) => {
    const [showAll, setShowAll] = useState(2)

    return (
        <section className="section">
            <div className="section-title">
                <h2>{category_name}</h2>
            </div>
            <div className="product-list">
                {category_array.length > 0 && category_array.slice(0, showAll).map((product) => {
                    return (
                        product.active === true
                            ? < article className="product-item" key={product._id} >
                                <Link className="product-item-link" to={`/product/${product._id}`}>
                                    <img src={product.image} alt={product.name} loading="lazy" />
                                    <div className="product-item-info">
                                        <h3>{product.name}</h3>
                                        <span>${product.price}</span>
                                    </div>
                                </Link>
                            </article>
                            : null
                    )
                })}
                {
                    category_array.length > 2
                    ?<article className='product-item show-all'>
                        {showAll > 2
                            ? <span onClick={() => setShowAll(2)} className='show-all-btn'>Show less <br />-</span>
                            : <span onClick={() => setShowAll(category_array.length)} className='show-all-btn'>Show all <br />+</span>
                        }
                    </article>
                    : null
                }
            </div>
        </section >
    )
}

export default Section