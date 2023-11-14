import { useState } from 'react'
import './App.css'
import { Image, Paragraph, SubTitle, Title } from './components'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Title title = "Welcome to Components ReactJS"/>
      <SubTitle subtitle = "This is an example of components with ReactJS"/>
      <Image alt = "logo react" height = "100%" width = "80%" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png"/>
      <Paragraph paragraph = "Estamos haciendo los ejercicios de props de React"/>
    </>
  )
}

export default App
