import "./Dashboard.css";
import { initController } from "../../utils";

const templateDashboard = () => `
   <div class="dashboardcontainer">
        <ul>
            <li>
                <figure id="pokemonaccess">
                        <img class="juegos" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/icon_pokemon_chula-removebg-previewNUEVA.png?raw=true" alt="">
                        <img class="letras" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/letras_pokemon-removebg-preview.png?raw=true" alt="">
                </figure>
            </li>
            <li>
                <figure id="game2access">
                    <img src="" alt="">
                    <h2></h2>
                </figure>
            </li>
            <li>
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
    eventListeners();
}