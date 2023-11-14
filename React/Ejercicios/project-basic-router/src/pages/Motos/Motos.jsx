import { MotoCard } from "../../components"
import { getMotos } from "../../data/motos"
import { Link, Outlet } from "react-router-dom"

export const Motos = () => {
    const motos = getMotos()
    return (
        <>
            <div>
                <h1>Mis motos favoritas 🏍️❤️</h1>
                <ul>
                    {motos.map((moto) => (
                        <li key={moto.id}>
                            <Link to = {`/moto/${moto.id}`}>
                                <MotoCard 
                                mark = {moto.mark} 
                                model = {moto.model} 
                                cc = {moto.cc} 
                                weight = {moto.weight} 
                                horsepower = {moto.horsepower}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Outlet/>
        </>
    )
}