import { useState } from "react"
import { Condicional } from "../../components/index"

export const Home = () => {
    const [valor, setValor] = useState(false)
    return (
    <div>
        {!valor && (
            <Condicional/>
        )}
        <button onClick={() => setValor((value) => value = !value)}>CAMBIAR ESTADO</button>
    </div>
  )
}