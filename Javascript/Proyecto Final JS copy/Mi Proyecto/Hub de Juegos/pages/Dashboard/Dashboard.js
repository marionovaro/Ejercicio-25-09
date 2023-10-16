import "./Dashboard.css";
import { initController } from "../../utils";

const templateDashboard = () => `
   <div class="dashboardcontainer">
        <ul>
            <li>
                <figure id="pokemonaccess">
                    <img src="" alt="">
                    <h2></h2>
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