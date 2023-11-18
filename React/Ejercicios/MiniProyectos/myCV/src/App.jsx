import './App.css'
import { About, BotonRender, Education, Experience, Mario, More, Separador } from './components'
import { CV } from './data/dataMario'

const { mario, languages, education, experience, habilities, hobbies } = CV

export const App = () => {
  return (
    <>
      <Mario mario = {mario}/>
      <Separador titulo= "About"/>
      <About about = {mario}/>
      <BotonRender education = {education} experience = {experience}/>      
      <Separador titulo= "More Info"/>
      <More
        languages = {languages}
        habilities = {habilities}
        hobbies = {hobbies}
      />
    </>
  )
}
