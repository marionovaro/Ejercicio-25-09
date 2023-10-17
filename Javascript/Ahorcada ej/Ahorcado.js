// ! 1. ---- template
// ? 2. ---- listeners
// ! 3. ---- printPage

let vidasRestantes = 11
let arrayPalabrasRandom = ["Manatí", "Mandril", "Mangosta", "Mantarraya", "Mapache", "Mariposa", "Mariquita"]

const palabraRandom = () => {
    const word = arrayPalabrasRandom[Math.floor(Math.random()*arrayPalabrasRandom.length)];
    const splitWord = word.split("")
    return splitWord
}
const palabra = palabraRandom();
console.log(palabra);


const encontrarValor = () => {
    const letraInput = document.getElementById("letra"); // metemos input en variable
    const boton = document.getElementById("buttonsubmit"); // metemos botón en variable

    boton.addEventListener("click",  () => { // eventlistener de click al boton
        let valorLetra = letraInput.value // ---------- cogemos la letra introducida
        console.log(valorLetra)
        resultado();
        // if (palabra.includes(valorLetra)) { // -------------- si el array contiene la letra introducida:
        //     console.log("Well Done!")
        // } else {
        //     vidasRestantes -= 1 // ------------------ queda una vida menos
        //     console.log(`No es! Te quedan ${vidasRestantes} vidas`)
        // }

        return valorLetra
    });

    return evento()
};
const valorLetraGeneral = encontrarValor() //! -------------------------------------------------------------------------------------------------- encontrarValor() tiene valor undefined


const posiciones = []
const resultado = () => {
    const cajaResultado = document.getElementById("resultado"); // caja donde pintamos las barras bajas y las letras acertadas
    // cajaResultado.textContent = "_ ".repeat(palabra.length);
    const element = valorLetraGeneral // ------------------------- letra introducida en el input
    console.log(element) //! ---------------------------------------------------------------------------------------------------------- el problema está aqui, elemento undefined
    let getPositions = palabra.indexOf(element) // -------------------- getPositions es la posicion de la palabra introducida
    while (getPositions !== -1) {
        posiciones.push(getPositions)
        getPositions = palabra.indexOf(element, getPositions + 1)
    }
    console.log(posiciones)
}
resultado();










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