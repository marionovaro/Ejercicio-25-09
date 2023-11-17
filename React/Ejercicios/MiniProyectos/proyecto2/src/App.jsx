import { useState } from 'react'
import './App.css'
import { CharacterList, Footer, Header, ItemList, Title, Main, SubTitle, Paragraph } from './components'
import { dataRicky } from './data/rickydata'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header>
        <Title children = "Rick & Morty Characters" />
      </Header>
      <Main>
        <SubTitle>
          All Characters
        </SubTitle>
        <div id="gallery">
          {dataRicky.results.map((character) => (
              <CharacterList
                key = {character.id}
                name = {character.name}
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
        </div>
      </Main>
      <Footer>
            <Paragraph children="Este ha sido un ejercico de ReactJS"/>
            <Paragraph children="Created by Mario Novaro"/>
      </Footer>
    </>
  )
}

export default App
