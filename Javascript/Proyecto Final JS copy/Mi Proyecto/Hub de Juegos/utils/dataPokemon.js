import { setData } from "../global/state/globalState";
import { getPokemonById } from "../services/pokemon.service";
import { typePokemon } from "./typePokemon";

let dataGlobal
export const getData = async () => {
    const allPokemon = [];
    for (let i = 1; i < 151; i++) {
      allPokemon.push(await getPokemonById(i));
    }
    return mappeoData(allPokemon);
}
const mappeoData = (arrayamapear) => {
    const allPokemonMap = arrayamapear.map((pokemon) => ({
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      type: pokemon.types,
      id: pokemon.id,
    }))
 
    const types = typePokemon(allPokemonMap); //? types almacena todos los tipos en array
    dataGlobal = {
        pokemonData: allPokemonMap,
        type: types,
  };
  return dataGlobal;
}


export const getInfo = async () => {
  console.log("actualizando info... 👌🔍");
    const data = await getData();
    setData(data, "Pokemon");
};

getInfo();