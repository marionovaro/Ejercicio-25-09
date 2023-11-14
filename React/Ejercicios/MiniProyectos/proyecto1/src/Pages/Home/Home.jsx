import { CardCharacter } from "../../components/CardCharacter/CardCharacter"

export const Home = () => {

  return (
    dataRicky.map((character) => (
    <CardCharacter
        name = {character.name}
        key = {character.id}
        image = {character.image}
        status = {character.status}
        origin = {character.origin.name}
        />
      ))
  )
}
