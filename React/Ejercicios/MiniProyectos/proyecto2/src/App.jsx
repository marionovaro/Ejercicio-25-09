import { useState } from 'react'
import './App.css'
import { Footer, Header, Title } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header>
        <Title children = "Proyecto 2" />
      </Header>
      <Main>
        
      </Main>
      <Footer>

      </Footer>
    </>
  )
}

export default App
