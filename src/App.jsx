import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./Screens/Login/Login.jsx"
import Register from "./Screens/Register/Register.jsx"
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword.jsx"
import ResetPassword from "./Screens/ResetPassword/ResetPassword.jsx"
import Home from "./Screens/Home/Home.jsx"
import CreateProduct from "./Screens/CreateProduct/CreateProduct.jsx"
import ProductDetail from "./Screens/ProductDetail/ProductDetail.jsx"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:reset_token' element={<ResetPassword />} />
        <Route path='/home' element={<Home />} />
        <Route path='/product/new' element={<CreateProduct />} />
        <Route path='/product/:product_id' element={<ProductDetail />} />
      </Routes>
    </>
  )
}

export default App
