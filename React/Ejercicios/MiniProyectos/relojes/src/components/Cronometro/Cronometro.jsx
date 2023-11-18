import { useEffect, useState } from "react";
import "./Cronometro.css"

export const Cronometro = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); //? seteamos que el tiempo vaya sumando 10 milisegundos (incrementación cronómetro) y guardamos ese incremento en la const time
      }, 10) //? -------------------------------- esto lo va a hacer cada 10 milisegundos tiene que ser acorde la suma con el tiempo para sumar lo que haya pasado, si lo hago cada 20, tengo que sumar 20
    } else { 
      clearInterval(interval) //? si el resultado es null, el interval se vuelve a null y no crece
    }
    return () => clearInterval(interval) //? esto es para asegurarnos que se deja de contar si se deja la app
  })
  
  return (
    <section className="section cronometro">
      <img className="icono" src="https://icons.veryicon.com/png/o/miscellaneous/iview30-ios-style/ios-timer-4.png" alt="icono cronómetro" />
      <div className="card">
      <h1>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span> {/* el % se usa para indicar que devolveremos el minuto cuando el sobrante (segundos) sea una porción entera de 60 */}
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span> {/* el slice se usa para esconder ese 0 que hemos añadido cuando el valor crezca a las 2 cifras */}
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </h1>
      <div className="cronometro-botones">
        {!timerOn && time == 0 && <button onClick={() => setTimerOn(true)}>Start</button>}  {/* iniciamos el timer */}
        {timerOn && time > 0 && <button onClick={() => setTimerOn(false)}>Stop</button>}  {/* paramos el timer */}
        {!timerOn && time > 0 && <button onClick={() => setTimerOn(true)}>Resume</button>} {/* iniciamos el timer desde el punto (time) en el que estaba */}
        {!timerOn && time > 0 && <button onClick={() => setTime(0)}>Reset</button>}  {/* reiniciamos el timer (valor time a 0) */}
      </div>
      </div>
    </section>
  )
}