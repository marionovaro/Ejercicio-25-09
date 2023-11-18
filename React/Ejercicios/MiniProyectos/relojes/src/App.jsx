import { useState } from 'react'
import './App.css'
import { Countdown, Cronometro, RelojDigital } from './components'

export const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <RelojDigital/>
      <Countdown/>
      <Cronometro/>
    </>
  )
}
