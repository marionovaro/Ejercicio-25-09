import './App.css'
import { About, Education, Experience, Mario, More, Separador } from './components'
import { CV } from './data/dataMario'

const { mario, education, experience, languages, habilities, hobbies } = CV

export const App = () => {
  return (
    <>
      <Mario mario = {mario}/>
      <Separador titulo= "About"/>
      <About about = {mario}/>
      <Separador titulo= "Education"/>
      <Education education = {education}/>
      <Separador titulo= "Experience"/>
      <Experience experience = {experience}/>
      <Separador titulo= "More Info"/>
      <More
        languages = {languages}
        habilities = {habilities}
        hobbies = {hobbies}
      />
    </>
  )
}
