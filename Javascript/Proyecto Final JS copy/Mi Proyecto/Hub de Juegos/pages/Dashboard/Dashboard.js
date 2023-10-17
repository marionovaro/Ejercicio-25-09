import "./Dashboard.css";
import { initController } from "../../utils";
import { getData } from "../../global/state/globalState";
import { getInfo } from "../../utils/dataPokemon";


const templateDashboard = () => `
   <div class="dashboardcontainer">
        <ul id="listadojuegos">
            <li class="lis">
                <figure id="pokemonaccess">
                        <img class="juegos" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/icon_pokemon_chula-removebg-previewNUEVA.png?raw=true" alt="">
                        <img class="letras" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/letras_pokemon-removebg-preview.png?raw=true" alt="">
                </figure>
            </li>
            <li class="lis">
                <figure id="game2access">
                    <img src="" alt="">
                    <h2></h2>
                </figure>
            </li>
            <li class="lis">
                <figure id="game3access">
                    <img src="" alt="">
                    <h2></h2>
                </figure>
            </li>
        </ul>
    </div>
`

const eventListeners = () => {
    const pokemonAccess = document.getElementById("pokemonaccess");
    pokemonAccess.addEventListener("click", () => {
        initController("Pokemon");
    });
};

export const printmyTemplateDashboard = () => {
    document.querySelector("main").innerHTML = templateDashboard();
    document.querySelector("header").style.display = "flex";
    document.querySelector("footer").style.display = "flex";
    eventListeners();
    console.log(getData())
    getInfo()
}