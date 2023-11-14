import { useState } from 'react'

import './App.css'
import { Home } from './Pages'
import { CardCharacter } from './components/CardCharacter/CardCharacter'
import { dataRicky } from './data/rickydata'

const App = () => {

  return (
    <>
        {dataRicky.results.map((character) => (
          <CardCharacter
            name = {character.name}
            key = {character.id}
            image = {character.image}
            status = {character.status}
            origin = {character.origin.name}
          />
        ))}
    </>
  )
}

export default App
