import { useEffect, useState } from "react";
import "./RelojDigital.css"

export const RelojDigital = () => {
  const [time, setTime] = useState();
  useEffect(() => { //? -------------------------- se ejecuta cada vez que cambie la función de dentro, es decir, cada segundo por el interval
    setInterval(() => {
      const date = new Date(); //? --------------- fecha de hoy
      setTime(date.toLocaleTimeString()); //? ---- le decimos con setState que cambie la hora (estado) a la actual
    }, 1000) //? --------------------------------- cada segundo
  }, [])
  
  return (
    <section className="section reloj">
      <img className="icono" src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/10-512.png" alt="icono hora" />
      <div className="card">
        <h1>{time}</h1>
      </div>
    </section>
  )
}