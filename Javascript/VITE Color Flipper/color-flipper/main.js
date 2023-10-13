import './style.css'

const colorpalette = {
    "#FFFFFF": "-",
    "#FCBCB8" : "Melon",
    "#D2E59E" : "Tea green",
    "#52D1DC" : "Robin egg blue",
    "#957FEF" : "Tropical indigo",
    "#E9D985" : "Flax"
}

let selector = document.getElementById("colorpicker"); // identificando el selector en el que hay que introducir options

const addOptionstoColorPicker = () => {
    for (let color in colorpalette) {
        let option = document.createElement("option");
        option.value = color;
        option.textContent = colorpalette[color];
        selector.append(option);
    }
}
addOptionstoColorPicker(); // llamando a la funcion para crear opciones en el selector

let nombrecolor = document.getElementById("nombrecolor") // identificando el h3 que hay que cambiar

const dinamicBackgroundAndText = () => {
    selector.addEventListener("change", (evento) => {
        const newColor = evento.target.value;
        document.body.style.backgroundColor = newColor;
        nombrecolor.textContent = `${colorpalette[newColor]} | ${newColor}`;
    })
}
dinamicBackgroundAndText(); // llamando a la función para cambiar el fondo y texto cuando cambie la selección
