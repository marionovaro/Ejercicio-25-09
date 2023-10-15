import { printTemplateHeader, printTemplateFooter } from "../components";

export const initTemplate = () => {
    const header = document.createElement("header"); //creando etiqutas
    const main = document.createElement("main");
    const footer = document.createElement("footer");

    const app = document.getElementById("app");
    app.append(header, main, footer); // solamente estamos inyectando las etiquetas
    console.log(app)
   
    main.style.height = "75vh";

    // printTemplateHeader(); // los llamamos para que se inyecten los codigos html (contenido)
    // printTemplateFooter();
    console.log("funciona2")
    // en el main se inyecta en funcion de la pantalla en la que estemos
};