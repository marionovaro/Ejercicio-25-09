export const MotosCustom = ({mark, model, cc, weight, horsepower}) => {
  return (
    <ul>
        <li><h2>{mark}</h2></li>
        <li><h1>{model}</h1></li>
        <li><h4>{cc}</h4></li>
        <li><h4>{weight}</h4></li>
        <li><h4>{horsepower}</h4></li>
    </ul>
  )
}