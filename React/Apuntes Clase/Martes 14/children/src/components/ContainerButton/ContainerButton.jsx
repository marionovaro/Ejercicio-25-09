import "./ContainerButton.css"

export const ContainerButton = ( {children} ) => { //? hacemos el destructuring del props (lo que recibimos en la función componente y nos quedamos con el children, que está dentro de props)
  console.log(children) //? en este caso como lo llamamos en App y tiene una <p> y un <button> dentro, el children es un array de objetos: objeto1 => button; objeto 2 => p
    return (
    <div className="card">{children}</div>
  )
}
