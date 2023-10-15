import { printTemplateFooter } from "../../../Mi Proyecto/Hub de Juegos/components";
import { getUser } from "../global/state/globalState";
import { Login, PrintPokemonPage, printTemplateDashboard } from "../pages";

//! ----------------------------------------------------------------------------------------------------------------------
//? ------------------------------------- CONTROLADOR DE LO QUE SE RENDERIZA EN CADA MOMENTO------------------------------
//! ----------------------------------------------------------------------------------------------------------------------

export const initControler = (pagesRender) => {
  console.log("soy el user", getUser().name);
  switch (pagesRender) {
    case undefined:
      localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login(); //! evalua usuario, si hay, te renderiza la dashboard, si no hay, te renderiza el login
      break;
    case "Pokemon":
      PrintPokemonPage();
      break;
    case "Dashboard":
      printTemplateDashboard(); //! cuando haces login detecta el usuario y te renderiza el dashboard, donde hay eventlisteners si clickas los juegos y te hace initControler("nombredeljuego")
      break;
    case "Topo":
      "Topo()"; // aún no está creado
      break;
    case "Login":
      Login();
      break;
    case "Memory":
      "Memory()"; // aún no está creado
      break;
  }
};
