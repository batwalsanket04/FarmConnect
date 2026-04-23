import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Componant/Navbar'
import FarmerForms from './Componant/FarmerForms'
import BuyerForms from './Componant/BuyerForms'
 

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<FarmerForms/>} />
        <Route path="/buyer" element={<BuyerForms/>} />
{/* 
        <Route path="/farmer" element={<h1>Farmer</h1>} />
        <Route path="/buyer" element={<h1>Buyer</h1>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App