import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Motos, Moto, Home, About} from "./pages/index.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename = "/">
      <Routes>
        <Route path = "/" element = {<App/>}> {/* sin params se va a ir a la App */}
          <Route index element = {<Home/>}/> {/* el index element es el que se renderiza en el path sin params */}
          <Route path = "motos" element = {<Motos/>}/> {/* se le añade eso al url base y te lleva al element introducido */}
          <Route path = "moto/:id" element = {<Moto/>}/>
          <Route path = "about" element = {<About/>}/>
          <Route path = "*" element = {
            <main>
              <p> 404 - No existe la ruta</p>
            </main>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
