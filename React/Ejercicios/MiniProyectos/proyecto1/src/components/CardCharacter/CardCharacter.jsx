export const CardCharacter = ({ name, image, status, origin }) => {
  if (status == "Alive") {
    return (
        <div>
          <img src = {image} />
          <h2>{name}</h2>
          <h4>{origin}</h4>
        </div>
    )
  }
}

