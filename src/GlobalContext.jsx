import { useContext, createContext } from "react";
import { useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [condicionMenu, setCondicionMenu] = useState(false)
    const [image, setImage] = useState('')
    const [showResults, setShowResults] = useState(false)

    const handleChangeFile = (evento) => {
        const file_found = evento.target.files[0]
        const FILE_MB_LIMIT = 5
        if (file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024) {
            console.log('El archivo es demasiado grande')
        }
        const lector_archivos = new FileReader()
        lector_archivos.onloadend = () => {
            setImage(lector_archivos.result)
        }
        if (file_found) {
            lector_archivos.readAsDataURL(file_found)
        }
    }

    const [cart, setCart] = useState([])
    const [count, setCount] = useState(0)



    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem('cart'))
        if (cart) {
            setCart(cart)
        }
    }, [])
    
    const logout = () => {
        setCondicionMenu(false)
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('user_info')
        sessionStorage.removeItem('cart')
    }

    return (
        <GlobalContext.Provider value={{
            image,
            setImage,
            handleChangeFile,
            showResults,
            setShowResults,
            cart,
            count,
            setCount,
            condicionMenu,
            setCondicionMenu,
            logout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export { useGlobalContext }  