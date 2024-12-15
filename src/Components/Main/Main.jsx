import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import Footer from '../Footer/Footer.jsx'
import { useGlobalContext } from '../../GlobalContext.jsx'
import Section from '../Section/Section.jsx'

const Main = ({ products }) => {
    const { setShowResults, categories } = useGlobalContext()
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        setProductsList(products.filter((product) => product.active === true))
    }, [products])

    return (
        <>
            <main className='main' onClick={() => setShowResults(false)}>
                {productsList.length > 0
                    ? categories.map((category) =>
                        products.filter((product) => product.category === category).length > 0
                            ? <Section key={category} category_array={products.filter((product) => product.category === category)} category_name={category} />
                            : null)
                    :
                    < div className='loading' >
                        <span className="loader"></span>
                    </div >}
            </main>
            <Footer />
        </>
    )
}

export default Main
