import { dataRicky } from "../../data/rickydata"

export const CharacterList = ({ id }) => {
    return (
        dataRicky.results.map((character) => {
            <ul className={`character-${id}`}></ul>
        })
    
    )
}