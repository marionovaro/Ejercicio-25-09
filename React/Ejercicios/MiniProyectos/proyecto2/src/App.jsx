import { useState } from 'react'
import './App.css'
import { CharacterList, Footer, Header, ItemList, Title, Main } from './components'
import { dataRicky } from './data/rickydata'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header>
        <Title children = "Proyecto 2" />
      </Header>
      <Main>
        {dataRicky.results.map((character) => (
            <CharacterList
              key = {character.id}
              id = {character.id}
              >
            <ItemList
              key = {character.id}
              name = {character.name}
              image = {character.image}
              status = {character.status}
              origin = {character.origin.name}
            />
          </CharacterList>
        ))}
      </Main>
      <Footer>

      </Footer>
    </>
  )
}

export default App
