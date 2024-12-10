import React from 'react'
import './LoadingOverlay.css'
import { useGlobalContext } from '../../GlobalContext.jsx'

const LoadingOverlay = () => {
    const { loading } = useGlobalContext()

    return (
        <div className='loading-overlay' style={{ display: loading ? 'flex' : 'none' }}>
            <div className="loading-spinner"></div>
        </div>
    )
}

export default LoadingOverlay  