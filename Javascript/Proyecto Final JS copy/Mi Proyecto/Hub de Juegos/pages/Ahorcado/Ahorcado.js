// ! 1. ---- template
// ? 2. ---- listeners
// ! 3. ---- printPage

let arrayPalabrasRandom = ["Manatí", "Mandril", "Mangosta", "Mantarraya", "Mapache", "Mariposa", "Mariquita"]
const palabraRandom = () => {
    const palabra = arrayPalabrasRandom[Math.floor(Math.random()*arrayPalabrasRandom.length)];
    return palabra
}
console.log(palabraRandom());


const checkLetraUser = () => {
    let letraInput = document.getElementById("letra");
    // let valorLetra = letraInput.value
    // console.log(valorLetra)
    const boton = document.getElementById("buttonsubmit");

    boton.addEventListener("click", () => {
        let valorLetra = letraInput.value
        console.log(valorLetra)
    })
};

checkLetraUser();