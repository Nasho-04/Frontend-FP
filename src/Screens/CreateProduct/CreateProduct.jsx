import React from 'react'
import { POST } from '../../utils/POST.js'
import { extractFormData } from '../../utils/ExtractData.js'
import { useState } from 'react'
import ProductForm from '../../Components/ProductForm/ProductForm.jsx'
import './CreateProduct.css'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Overlay from '../../Components/Overlay/Overlay.jsx'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../GlobalContext.jsx'
import LoadingOverlay from '../../Components/LoadingOverlay/LoadingOverlay.jsx'

const CreateProduct = () => {
  const [image, setImage] = useState('')
  const [confirmCreate, setConfirmCreate] = useState(false)
  const { loading, setLoading } = useGlobalContext()
  const navigate = useNavigate()
  const handleSubmitCreateProductForm = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
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
        setLoading(false)
        setConfirmCreate(true)
      }
      else {
        setLoading(false)
        const error_message = response.message
        const error_span = document.querySelector('.create-product-error')
        error_span.textContent = error_message
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeFile = (evento) => {
    const file_found = evento.target.files[0]
    const FILE_MB_LIMIT = 2
    if (file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024) {
      const error_span = document.querySelector('.create-product-error')
      error_span.textContent = 'Image size must be less than 2MB'
      file_found.value = ''
    }
    else {
      const lector_archivos = new FileReader()
      lector_archivos.onloadend = () => {
        setImage(lector_archivos.result)
      }
      if (file_found) {
        lector_archivos.readAsDataURL(file_found)
      }
    }
  }

  return (
    <>
    <Navbar />
    <div className='create-product-container'>
      <h1 className='create-product-title'>Create your product</h1>
      <span className='create-product-error'></span>
      <ProductForm handleSubmitCreateProductForm={handleSubmitCreateProductForm} handleChangeFile={handleChangeFile} image={image} />
    </div>
    <Overlay toggle={confirmCreate} setToggle={setConfirmCreate} product={{}} btnFunction={() => navigate(`/home`)} btnText1="Go Home" text="Product created successfully!" />
    <LoadingOverlay />
    </>
  )
}

export default CreateProduct