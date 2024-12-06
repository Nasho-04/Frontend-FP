import React from 'react'
import './Overlay.css'

const Overlay = ( { product, toggle, setToggle, btnFunction, btnText1, btnText2, text } ) => {

    return (
        <div className='product-overlay' style={{ display: toggle ? 'flex' : 'none' }}>
            <div className='product-modal'>
                <h3>{text}</h3>
                <div className='product-buttons' >
                    <button className='product-button confirm' onClick={() => btnFunction(product._id)}>{btnText1}</button>
                    {btnText2 && <button className='product-button cancel' onClick={() => setToggle(false)}>{btnText2}</button>}
                </div>
            </div>
        </div>
    )
}

export default Overlay