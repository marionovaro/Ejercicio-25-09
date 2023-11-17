import "./CharacterList.css"

export const CharacterList = ({name, children }) => { //? preguntar si es mejor poner el ItemList en App.jsx o dentro de este componente
    return (
            <ul className={`character ${name.split(" ").splice(0, 1)}`}>{ children }</ul>
    
    )
}