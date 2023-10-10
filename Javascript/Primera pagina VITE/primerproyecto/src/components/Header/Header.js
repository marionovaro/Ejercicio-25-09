import { printTemplateNav } from "../Nav/Nav";
import "./Header.css";

// ----> 1) template con la imagen el logo, el titulo y la nav

const template = () => `
  <div class="containerLogo">
    <img
      src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
      alt="logo de la pagina"
      id="logo"
    />
  </div>
  <div id="containerNav"></div>
`;
//----> 2) Funcion que pinta --->
export const printTemplateHeader = () => {
  document.querySelector("header").innerHTML = template();
  printTemplateNav();
};
