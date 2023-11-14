import { useState } from 'react'
import './App.css'
import { Footer, Header, Image, Main, Paragraph, SubTitle, Title } from './components'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header>
        <Title title = "Welcome to Components ReactJS"/>
      </Header>
      <Main>
        <SubTitle subtitle = "This is an example of components with ReactJS"/>
        <Image alt = "logo react" height = "100%" width = "80%" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png"/>
      </Main>
      <Footer>
        <Paragraph paragraph = "Estamos haciendo los ejercicios de children de React"/>
      </Footer>
    </>
  )
}

export default App
