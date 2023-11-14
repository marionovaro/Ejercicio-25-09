import { useState } from 'react'
import './App.css'
import { Image, Paragraph, SubTitle, Title } from './components'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Title/>
      <SubTitle/>
      <Image/>
      <Paragraph/>
    </>
  )
}

export default App
