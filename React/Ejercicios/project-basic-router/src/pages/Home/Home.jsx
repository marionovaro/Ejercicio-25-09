import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <>
            <h2>Home Page</h2>
            <h4>Visita la página de motos favoritas de Mario:</h4>
            <Link to = "motos">Motos Favoritas 🏍️❤️</Link>
        </>
    )
}