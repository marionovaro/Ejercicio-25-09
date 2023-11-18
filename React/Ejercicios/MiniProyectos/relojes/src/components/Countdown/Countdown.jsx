import { useEffect, useState } from "react"
import "./Countdown.css"


export const Countdown = () => {
  const [left, setLeft] = useState("")
  const [future, setFuture] = useState(true)

  const dateRequest = new Date().getTime()
  let goalDate = new Date("Nov 18, 2023 11:24:00") //? ---- fecha objetivo
  let goalTime = goalDate.getTime() //? ------------------ la pasamos a milisegundos
  let showDate = goalDate.toLocaleDateString() //? ------- simplemente para mostrarla debajo del countdown

  useEffect(() => {
    let interval = setInterval(() => { //? --------------------------- para que se ejecute y cambie a cada segundo
      let now = new Date().getTime() //? ----------------------------- fecha de hoy en milisegundos
      let diff = goalTime - now
      let diffDays = Math.floor((diff / (1000 * 60 * 60 * 24))) //? ---- convertimos a dias
      let diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);


          if (dateRequest > goalTime) { //? ----------------------------- SI EL COUNTDOWN ES MIRANDO AL PASADO
            // setFuture(!future)
            setLeft(diffDays*-1 + "d " + diffHours*-1 + "h " + diffMinutes*-1 + "m " + diffSeconds*-1 + "s "); //? como goal es menor, la diferencia es negativa ponemos los numeros en positivo haciendo *-1
            if (diff > 0) {
              clearInterval(interval)
              setLeft("COUNTDOWN FINISHED")
            } 
          } else { //? -------------------------------------------------- SI EL COUNTDOWN ES MIRANDO AL FUTURO
            setLeft(diffDays + "d " + diffHours + "h " + diffMinutes + "m " + diffSeconds + "s ");
            if (diff < 0) {
              clearInterval(interval)
              setLeft("COUNTDOWN FINISHED")
            }
          }
    }, 1000)
    if (dateRequest > goalTime) { //? esto lo pongo aquí para que no se monte y desmonte en cada render que cumpla la condicion (todos si el countdown es pasado)
      setFuture(!future)
    }
  }, [])
  return (
    <section className="section countdown">
      <img className="icono" src="https://cdn-icons-png.flaticon.com/512/58/58778.png" alt="icono cuenta atrás" />
      <h3 className="description-render-optional">{future == true ? "Faltan" : "Han pasado"}</h3> 
      {/* {console.log(left)} */}
      <div className="card">
        <h1>{left}</h1>
      </div>
      <h2 className="description-render-optional">{future == true ? "Para" : "Desde"} {showDate}</h2>
    </section>
  )
}