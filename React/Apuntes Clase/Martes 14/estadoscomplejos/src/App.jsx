import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [alumno, setAlumno] = useState({ //? ponemos en useState un elemento complejo (objeto)
    name: "",
    age: 0,
  })

  return (
    <>
      <p> Name: {alumno["name"]} Edad:{alumno.age} </p> {/* dos formas diferentes de hacer acceder a la propiedad del objeto */}
      <input type='text' name='name' id='name' onChange={(evento) => setAlumno((value) => {
          return { ...value, name: evento.target.value} //? es obligatorio hacer la copia, ya que los estados en React son imutables, copiamos y le decimos que ahora name es el valor que se haya puesto en el input
      })}/>
      <input type='number' name='age' id='age' onChange={(evento) => setAlumno((value) => {
          console.log(evento.target.value)
          return { ...value, age: evento.target.value}
      })}/>
        
    </>
  )
}

export default App
