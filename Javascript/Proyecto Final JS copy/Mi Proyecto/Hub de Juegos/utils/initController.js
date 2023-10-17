import { printmyTemplateDashboard, Login } from "../pages";
import { printTemplateHeader, printTemplateFooter } from "../components";
import { getUser } from "../global/state/globalState";
// import {Login} from "../pages"
import { printPokemonPage } from "../pages/Pokemon/Pokemon";

export const initController = (paginaRender) => {
    switch(paginaRender) {
        case undefined:
            localStorage.getItem(getUser().name) ? printmyTemplateDashboard() : Login()
        case "Dashboard":
            printmyTemplateDashboard();
            break;
        case "Pokemon":
            // printPokemonPage();
            break;
        case "Login":
            Login()
            console.log("funciona")
            break;
        case "juego 1":
            "función que crea juego 1";
            break;
        case "juego 2":
            "función que crea juego 2";
            break;
    } 
}