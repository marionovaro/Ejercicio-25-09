import { useEffect, useState } from "react";
import "./CodeFetchingInput.css"

export const CodeFetchingInput = () => {
  const [filter, setFilter] = useState("Pikachu");
  const [pokemonCollection, setPokemonCollection] = useState([])

  useEffect(() => {
    const getPokemonFiltered = async () => { //? el useEffect no puede ser asíncrono, por lo que hacemos la funcion de fetch de dentro asíncrona y no el hook entero
      const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/${filter.toLowerCase()}`) //? llamamos solamente al pokemon que tenga endpoint de lo que estamos buscando
      const pokemonListJson = await pokemonList.json(); //? lo parseamos
      // console.log(pokemonListJson)
      return {
        ...pokemonListJson,
        name: pokemonListJson.name,
        image: pokemonListJson.sprites.other.dream_world.front_default
      }
    }
    getPokemonFiltered().then((param) => setPokemonCollection([param])) //? seteamos como pokemon collection el pokemon que hemos traido de la api para mostrarlo
  }, [filter]) //? cada vez que cambia el filter que ponemos en el input hacemos un nuevo fetch a la api para traer el pokemon pedido

  return (
    <section id = "finder">
      <input type = "text" name = "find-pokemon" id = "find-pokemon" value = {filter}
        onChange = {(evento) => setFilter(evento.target.value)}
      />
      <ul>
        {pokemonCollection.map((pokemon) => (
          <li key = {pokemon.name} className = "card">
              <h1>{pokemon.name}</h1>
              <img src = {pokemon.image} alt = {pokemon.name} />
          </li>
        ))}
      </ul>
    </section>
  )
}