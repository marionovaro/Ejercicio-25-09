import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Gallery, Home, NotFound } from './pages/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}></Route>
          <Route index element ={<Home />}/>
          <Route path="/gallery" element={<Gallery />}/>
          <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
