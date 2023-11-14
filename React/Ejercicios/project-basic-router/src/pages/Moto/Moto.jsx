import { useParams, useNavigate } from "react-router-dom"
import { deleteMoto, getMoto } from "../../data/motos"
import { MotoCard } from "../../components"

export const Moto = () => {
    const params = useParams()
    const navigate = useNavigate()
    const moto = getMoto(params.id)

    if (!moto) return <p>No existe la moto que buscas 😭❌🔎</p>
    return (
        <div>
            <h1></h1>
            <MotoCard
                mark = {moto.mark} 
                model = {moto.model} 
                cc = {moto.cc} 
                weight = {moto.weight} 
                horsepower = {moto.horsepower}
            />
            <button onClick={() => {deleteMoto(moto.id).then(() => { {/* borra la moto que hemos cogido a traves del params */}
                navigate("/motos");
            })}}>Borrar a {moto.model}</button>
        </div>
    )
}