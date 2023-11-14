import './App.css'
import { useState } from 'react'
import { H1, Saludo, MotosCustom } from './components'
import { cities, motos} from "./data/index"
import { Home } from "./pages/Home/Home"

const App = () => {
  return (
    <>
      {//! 2. Renderiza según valor numérico asignado (horas)
      }
      {/* <Saludo/> */ }
      {/* en vez de llamar a la funcion entre llaves, la llamamos entre </> porque así debe ser */}


      {//! 3. Recorrer array y renderizar
      }
      {/* <ul>
      {cities.map((city) => (
        <H1 city={city}/>
      ))}
      </ul> */}
      {/* aquí si nos fijamos en cada elemento del array, ejecutamos otro componente (estamos componetizando) y lo llamamos con </>. lo que hace es devolver un h1 con la ciudad (elemento recorrido)*/}
      {/* debemos indicar que el destructuring que hemos hecho en el componente (miralo) hace referencia a la ciudad recorrida (param (entre llaves))  */}


      {//! 4. Recorrer array de objetos y renderizar
      }
      {/* {motos.map((moto) => (
        <MotosCustom
         key = {moto.model}
          mark = {moto.mark}
          model = {moto.model}
          cc = {moto.cc}
          weight = {moto.weight}
          horsepower= {moto.horsepower}
        />
      ))} */}
      {/* tenemos que atribuir el valor a los destructuring del componente MotosCustom, y lo hacemos con la moto recorrida, ya que ésta tiene la info en arrayobjetos.js   */}


      {//! 5. Botón cambia estado y renderiza según estado
      }
      <Home/>
    </>
  )
}

export default App
