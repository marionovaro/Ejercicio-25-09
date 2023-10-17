// ! 1. ---- template
// ? 2. ---- listeners
// ! 3. ---- printPage


const letraInput = document.getElementById("letra"); // metemos input en variable
const boton = document.getElementById("buttonsubmit"); // metemos botón en variable
const cajaResultado = document.getElementById("resultado"); // caja donde pintamos las barras bajas y las letras acertadas
const dibujoAhorcado = document.getElementById("dibujoahorcado")

let vidasRestantes = 11
let arrayPalabrasRandom = ["Manatí", "Mandril", "Mangosta", "Mantarraya", "Mapache", "Mariposa", "Mariquita"]
let posiciones = []
const arrayVacio = []

//? ----------------------------------------------------------------------------- buscamos una palabra random y la ponemos separada por letras en array

const palabraRandom = () => {
    let word = arrayPalabrasRandom[Math.floor(Math.random()*arrayPalabrasRandom.length)];
    word = word.toLowerCase()
    const splitWord = word.split("")
    return splitWord
}
const palabra = palabraRandom();
console.log(palabra);

// ? -------------------------------------------------------------- ARRAY PALABRA TO STRING (HACER CAJA Y MOSTRAR LETRAS)

const palabraToString = () => {
    let stringPalabra = palabra.toString();
    stringPalabra = stringPalabra.replaceAll(",", " ");
    console.log(stringPalabra)
};
palabraToString();

for (let a = 0; a < palabra.length; a++) {
    arrayVacio.push("_")
}
console.log(arrayVacio)

const arrayVaciotoString = () => {
    let stringVacio = arrayVacio.toString();
    stringVacio = stringVacio.replaceAll(",", " ");
    console.log(stringVacio)
    return stringVacio

}
const palabrasInyectadas = () => {
    cajaResultado.textContent = arrayVaciotoString()
    console.log(cajaResultado)
};
palabrasInyectadas();
//?----------------------------------------------------------------- función de click

function clic() {
    let valorLetra = letraInput.value // ---------- cogemos la letra introducida
    console.log(valorLetra)

    const element = valorLetra // ------------------------- letra introducida en el input
    let getPositions = palabra.indexOf(element) // -------------------- getPositions es la posicion de la palabra introducida
    while (getPositions !== -1) { // ------------------------------ buscamos las posiciones en caso de que se repita alguna palabra
        posiciones.push(getPositions)
        getPositions = palabra.indexOf(element, getPositions + 1)
    }

//  ---------------------------------------------------------- REEMPLAZAR HUECO POR LETRA SI ES CORRECTA ----------------------------------------------------------------
        if (palabra.includes(valorLetra)) { // -------------- si el array contiene la letra introducida:
            console.log("Well Done!")
            console.log(posiciones)
            for (let a = 0; a < posiciones.length; a++) {
                arrayVacio.splice(posiciones[a], 1, valorLetra);
                palabrasInyectadas();
            }
        } else {
            vidasRestantes -= 1 // ------------------ queda una vida menos
            console.log(`No es! Te quedan ${vidasRestantes} vidas`)
            pintarHorca();
            console.log(pintarHorca)
        }

        letraInput.value = "";
        posiciones = []
        console.log(posiciones)
    
    // return valorLetra
};

//? ---------------------------------------------------------------- EVENTLISTENERS

boton.addEventListener("click", clic);

// ? -------------------------------------------------------------- PINTAR HORCA
const pintarHorca = () => {
switch (vidasRestantes) {
    case 10:
        dibujoAhorcado.textContent = "_______________________________________"
        break;
    case 9:
        dibujoAhorcado.textContent = 
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "                   |                   "+
        "___________________|___________________"
        break;
    case 8:
        dibujoAhorcado.textContent = 
        "                    ______________________"
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "                   |                   "
        "___________________|___________________"
        break;
    case 7:
        dibujoAhorcado.textContent = 
        "                    ______________________"
        "                   |                      |     "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
    case 6:
        dibujoAhorcado.textContent = 
        "                    _______________________"
        "                   |                       |    "
        "                   |                      😁    "
        "                   |                      \|/    "
        "                   |                       |    "
        "                   |                      /\     "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
    case 5:
        dibujoAhorcado.textContent = 
        "                    _______________________"
        "                   |                       |    "
        "                   |                      🫤   "
        "                   |                      \|/    "
        "                   |                       |    "
        "                   |                      /\     "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
    case 4:
        dibujoAhorcado.textContent = 
        "                    _______________________"
        "                   |                       |    "
        "                   |                      ☹️    "
        "                   |                      \|/    "
        "                   |                       |    "
        "                   |                      /\     "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
    case 3:
        dibujoAhorcado.textContent = 
        "                    _______________________"
        "                   |                       |    "
        "                   |                      😧    "
        "                   |                      \|/    "
        "                   |                       |    "
        "                   |                      /\     "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
    case 2:
        dibujoAhorcado.textContent = 
        "                    _______________________"
        "                   |                       |    "
        "                   |                      😭  "
        "                   |                      \|/    "
        "                   |                       |    "
        "                   |                      /\     "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
    case 1:
        dibujoAhorcado.textContent = 
        "                    _______________________"
        "                   |                       |    "
        "                   |                      😱  "
        "                   |                      \|/    "
        "                   |                       |    "
        "                   |                      /\     "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
    case 0:
        dibujoAhorcado.textContent = 
        "                    _______________________"
        "                   |                       |    "
        "                   |                      😵    "
        "                   |                      \|/    "
        "                   |                       |    "
        "                   |                      /\   "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "                   |                            "
        "___________________|___________________         "
        break;
}
};































//? ---------------- PRUEBA DE FUNCIONES Y PROPIEDADES -----------------------
// const newArray = [];
// const cities = ["NY", "Barcelona", "Madrid", "Sydney", "Barcelona"]

// const element = "Barcelona"
// let getPositions = cities.indexOf(element)
// while (getPositions !== -1) {
//     newArray.push(getPositions)
//     getPositions = cities.indexOf(element, getPositions + 1)
// }

// console.log(newArray)

// let citiesstring = cities.toString();
// citiesstring = citiesstring.replaceAll(",", " ");
// console.log(citiesstring)

// for (let a = 0; a < newArray.length; a++) {
//     arrayVacio.splice(palabra.indexOf(valorLetra))
// }