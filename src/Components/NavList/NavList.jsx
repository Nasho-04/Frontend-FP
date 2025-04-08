import React from 'react'
import './NavList.css'
import { useGlobalContext } from '../../GlobalContext.jsx'
import { Link } from 'react-router-dom'

const NavList = () => {
    const { logout, setShowResults, condicionMenu, setCondicionMenu } = useGlobalContext()


    return (
        <>
            <span className='navbar-menu responsive' onClick={() => setCondicionMenu(!condicionMenu)}>
                {condicionMenu
                    ? <i className="bi bi-x-lg"></i>
                    : <i className="bi bi-list"></i>}
            </span>
            <div className='navbar-list-container' onClick={() => setShowResults(false)}>
                <ul className='navbar-list'>
                    <li><Link onClick={() => setCondicionMenu(false)} to='/home'>Home</Link></li>
                    <li><a onClick={() => setCondicionMenu(false)} href="/home#footer">Contact</a></li>
                    <li><Link onClick={() => setCondicionMenu(false)} to='/product/new'>Add Product</Link></li>
                    <li><Link to='/' onClick={logout}>Logout</Link></li>
                </ul>
            </div>
        </>
    )
}

export default NavList