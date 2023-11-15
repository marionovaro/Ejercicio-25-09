import "./Button.css"

export const Button = (props) => {
    return (
        <button>{props.children}</button> //? los children vienen dentro de los props, es como una propiedad se puede hacer así o como lo hemos hecho en ContainerButton
    )
}