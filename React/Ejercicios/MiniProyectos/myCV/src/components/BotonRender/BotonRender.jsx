import { useState } from "react"
import { Education, Experience } from "../index"
import "./BotonRender.css"



export const BotonRender = ({ education, experience }) => {
  const [render, setRender] = useState(true)
  return (
    <>
      <div id="button-render">
        <button onClick={() => setRender(true)}>
          Education
        </button>
        <button onClick={() => setRender(false)}>
          Experience
        </button>
      </div>
      {render == true
        ? <Education education = {education}/>
        : <Experience experience = {experience}/>}
    </>
  )
}