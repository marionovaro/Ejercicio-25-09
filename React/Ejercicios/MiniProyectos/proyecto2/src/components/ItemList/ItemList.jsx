import { Image } from "../Image/Image"
import "./ItemList.css"

export const ItemList = ({ name, image, status, origin }) => {
    return (
        <>
            <li>
                <h3>{name}</h3>
                <Image src = {image} alt = {`Imagen de ${name}`} width={300} height={300}/>
                <p>{status}</p>
                <p>{origin}</p>
            </li>
        </>

    )
}