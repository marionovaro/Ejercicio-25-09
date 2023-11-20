import { useEffect, useState } from "react"
import "./Countdown.css"


export const Countdown = () => {
  const newDate = new Date("Nov 21, 2025 11:24:00")

  const [left, setLeft] = useState("")
  const [future, setFuture] = useState(true)
  const [date, setDate] = useState(newDate.getTime())

  const dateRequest = new Date().getTime()
  // let goalDate = new Date("Nov 21, 2025 11:24:00") //? ---- fecha objetivo
  // setDate(goalDate.getTime()) //? ------------------ la pasamos a milisegundos
  // let showDate = goalDate.toLocaleDateString() //? ------- simplemente para mostrarla debajo del countdown

  const handleClick = (evento) => {
    let goalDate = evento.target.value
    let timeSplit = goalDate.split("-")
    let año = timeSplit[0]
    let mes = timeSplit[1]
    let dia = timeSplit[2]
    setDate(new Date(año, mes, dia).getTime())
  }


  useEffect(() => {
    // console.log(date)
    // console.log(left)
    let variable = new Date(date).getTime()
    let interval = setInterval(() => { //? --------------------------- para que se ejecute y cambie a cada segundo
      let now = new Date().getTime() //? ----------------------------- fecha de hoy en milisegundos
      let diff = variable - now
      let diffDays = Math.floor((diff / (1000 * 60 * 60 * 24))) //? ---- convertimos a dias
      let diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);
      setLeft(diffDays + "d " + diffHours + "h " + diffMinutes + "m " + diffSeconds + "s ")
      if (diff < 0) {
        clearInterval(interval)
        setLeft("COUNTDOWN FINISHED")
      }
      console.log("date" + date)
      console.log("diff" + diff)
    }, 1000)
    // if (dateRequest < date) { //? esto lo pongo aquí para que no se monte y desmonte en cada render que cumpla la condicion (todos si el countdown es pasado)
    //   setFuture(true)
    // } else {
    //   setFuture(false)
    // }
  }, [date])
  return (
    <section className="section countdown">
      <img className="icono" src="https://cdn-icons-png.flaticon.com/512/58/58778.png" alt="icono cuenta atrás" />
      <h3 className="description-render-optional">{future == true ? "Faltan" : "Han pasado"}</h3> 
      {/* {console.log(left)} */}
      <div className="card">
        <h1>{left}</h1>
      </div>
      <form action="submit">
        <input type="date" onChange={(evento) => handleClick(evento)} />
        {/* {console.log(goalDate)} */}
      </form>
      {/* <h2 className="description-render-optional">{future == true ? "Para" : "Desde"} {showDate}</h2> */}
    </section>
  )
}