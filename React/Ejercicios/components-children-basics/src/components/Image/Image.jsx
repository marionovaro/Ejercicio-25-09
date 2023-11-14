import "./Image.css"

export const Image = ({ src, alt, height, width}) => {
  return (
    <div id = "image-container">
      <img id="reactLogo" src = {src} alt = {alt} height={height} width={width} />
    </div>
  )
}
