import {Login} from "../pages"

export const initController = (paginaRender) => {
    switch(paginaRender) {
        case "Dashboard":
            "función que crea dash";
            break;
        case "Pokemon":
            "función que crea pokemon";
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