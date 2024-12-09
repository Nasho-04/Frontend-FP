import React from 'react'
import { POST } from '../../utils/POST.js'
import { extractFormData } from '../../utils/ExtractData.js'
import { useState } from 'react'
import ProductForm from '../../Components/ProductForm/ProductForm.jsx'
import './CreateProduct.css'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Overlay from '../../Components/Overlay/Overlay.jsx'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  const [image, setImage] = useState('')
  const [confirmCreate, setConfirmCreate] = useState(false)
  const navigate = useNavigate()
  const handleSubmitCreateProductForm = async (e) => {
    try {
      e.preventDefault()
      const formHTML = e.target
      const formValues = new FormData(formHTML)
      const formFields = {
        'name': '',
        'price': '',
        'category': '',
        'stock': '',
        'description': ''
      }
      const formValuesObject = await extractFormData(formFields, formValues)
      formValuesObject.image = image
      const response = await POST('https://backend-fp.vercel.app/api/products/', formValuesObject)
      if (response.ok) {
        setConfirmCreate(true)
        // ACTIVATE SOMETHING THAT SAYS "PRODUCT CREATED SUCCESSFULLY"
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  return (
    <>
    <Navbar />
    <div className='create-product-container'>
      <h1 className='create-product-title'>Create your product</h1>
      <ProductForm image={image} handleSubmitCreateProductForm={handleSubmitCreateProductForm} handleChangeFile={handleChangeFile} />
    </div>
    <Overlay toggle={confirmCreate} setToggle={setConfirmCreate} product={{}} btnFunction={() => navigate(`/home`)} btnText1="Go Home" text="Product created successfully!" />
    </>
  )
}

export default CreateProduct