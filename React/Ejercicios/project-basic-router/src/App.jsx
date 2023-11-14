import './App.css'
import { Title } from "./components/index"
import { NavLink, Outlet} from "react-router-dom"

const App = () => {

  return (
   <div className='App'>
      <header className='header'>
        <Title/>
      </header>
      <div id = "links-outlet-container">
        <nav id = "nav-links">
          <NavLink to = "">Home</NavLink>
          <NavLink to = "motos">Motos</NavLink>
          <NavLink to = "about">About</NavLink>
        </nav>
        <main>
          <Outlet/>
        </main>
      </div>
   </div>
  )
}

export default App
