import './App.css'
import { useState } from 'react'
import { H1, Saludo, MotosCustom } from './components'
import { cities, motos} from "./data/index"

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Saludo/> //? en vez de llamar a la funcion entre llaves, la llamamaos entre </> porque así debe ser*/ }  


      {/* <ul>
      {cities.map((city) => (
        <H1 city={city}/>
      ))}
      </ul> */}


      {motos.map((moto) => (
        <MotosCustom
          mark = {moto.mark}
          model = {moto.model}
          cc = {moto.cc}
          weight = {moto.weight}
          horsepower= {moto.horsepower}
        />
      ))}
    </>
  )
}

export default App
