import { printCardPokemon } from "../Card Pokemon/CardPokemon";
import "./Gallery.css";

const template = () => ` <section id="galleryContainer"></section> `;


// PARSEAMOS INFO OBTENIDA DESDE LA WEB PARA QUE LA ENTIENDA JS Y LA METEMOS EN UN ARRAY DE OBJETOS (ALLPOKEMON)
const getData = async () => {
  const allPokemon = [];
  for (let i = 1; i < 151; i++) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const jsonData = await data.json();
    allPokemon.push(jsonData);
  }
  // console.log("🚀 ~ file: Gallery.js:11 ~ getData ~ allPokemon:", allPokemon);

  mappeoData(allPokemon)
  // llamar a una funcion que mapea los datos y enviamos como parametro allPokemon
  // esa funcion que mapea llamara a unafuncion que pinta la figure de los pokemon
};
// ------ MAPEANDO ARRAY PARA QUEDARNOS CON NAME, IMAGEN Y TIPO -----------
const mappeoData = (arrayamapear) => {
  const allPokemonMap = arrayamapear.map((pokemon) => ({
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default,
    type: pokemon.types[0].type.name,
  }))
  printFigure(allPokemonMap)
  console.log(allPokemonMap)
}

// ESTA FUNCION LLAMA AL COMPONENTE QUE DIBUJA LA FOTO CON NOMBRE Y TYPE
const printFigure = (data) => {
  data.map((pokemon) => printCardPokemon(pokemon))
}



// 
export const printTemplateGallery = () => {
  document.querySelector("main").innerHTML = template();
  getData();
};

// resumen de todo a las 11.48 del lunes 9 de oct