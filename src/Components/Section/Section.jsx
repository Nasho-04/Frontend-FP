import React from 'react'
import './Section.css'
import { Link } from 'react-router-dom'

const Section = ({ category_array, category_name }) => {
    return (
        <section className="section">
            <div className="section-title">
                <h2>{category_name}</h2>
            </div>
            <div className="product-list">
                {category_array.length > 0 && category_array.map((product) => {
                        return (
                            product.active === true
                                ? < article className = "product-item" key = { product._id } >
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
        </div>
        </section >
    )
}

export default Section