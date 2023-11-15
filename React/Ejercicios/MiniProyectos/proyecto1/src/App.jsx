import { useState } from 'react'

import './App.css'
import { Home } from './Pages'
import { CardCharacter } from './components/CardCharacter/CardCharacter'
import { dataRicky } from './data/rickydata'

const App = () => {

  return (
    <>
        {/* mapeamos el array de objetos que contiene la info de los personajes y en cada uno de ellos mostramos CardCharacter. Debajo le estamos dando valor */}
        {/* al destructuring que tenemos como props en CardCharacter */}
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
