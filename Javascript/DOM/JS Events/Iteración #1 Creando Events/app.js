// 1.1 Añade un botón a tu html con el id btnToClick y en tu javascript añade el 
// evento click que ejecute un console log con la información del evento del click

let button = document.getElementById("btnToClick");
button.addEventListener("click", (event) => 
console.log(event))

// 1.2 Añade un evento 'focus' que ejecute un console.log con el valor del input.

let input1 = document.querySelector(".focus");
let valor = input1.value
input1.addEventListener("focus", (evento) => console.log(valor)); // también se puede con event.target.value

// 1.3 Añade un evento 'input' que ejecute un console.log con el valor del input.

let input2 = document.querySelector(".value");
let valor2 = input2.value;
input2.addEventListener("input", (evento) => console.log(valor2));