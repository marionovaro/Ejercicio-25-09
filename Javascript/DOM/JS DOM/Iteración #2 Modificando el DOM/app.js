// 2.1 Inserta dinamicamente en un html un div vacio con javascript.
let newArray = document.querySelectorAll(".fn-insert-here");
let position = newArray[2]; //estamos buscando la posición donde insertar nuestro elemento, puede ser cualquiera, pero para ponerlo al final he tenido que hacer esto pq hay tres con la misma clase

let newDiv = document.createElement("div");
position.insertAdjacentElement("afterend", newDiv)

// 2.2 Inserta dinamicamente en un html un div que contenga una p con javascript.

// let div = document.createElement("div")
// div.classList.add("creado") // le doy una clase para poder buscarlo luego y poner la <p> dentro
// position.insertAdjacentElement("afterend", div);

// let position2 = document.querySelector(".creado"); // estamos buscando el div que acabamos de crear
// let newP = document.createElement("p");
// position2.insertAdjacentElement("beforeend", newP);
// !-----------------------------------------------
let body = document.querySelector("body")
let div = document.createElement("div");
let newP = document.createElement("p");
body.append(div);
div.append(newP)


// 2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.

let divconp = document.createElement("div");
body.append(divconp);

for (let a = 1; a < 7; a++) {
	let p2 = document.createElement("p");
	divconp.append(p2);
};

// 2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.

let p = document.createElement("p");
p.textContent = "Soy dinámico!";
body.append(p);


// 2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.

let h2 = document.querySelector(".fn-insert-here");
h2.textContent = 'Wubba Lubba dub dub';

// 2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.
const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];

let ul = document.createElement("ul");
body.append(ul);

for(let social of apps) {
	let li = document.createElement("li");
	ul.append(li);
	li.append(social)
}

// 2.7 Elimina todos los nodos que tengan la clase .fn-remove-me

let fusilados = document.querySelectorAll(".fn-remove-me");
for (let disparo of fusilados) {
	disparo.remove();
}

// 2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div. 
	// Recuerda que no solo puedes insertar elementos con .appendChild.

let hola = document.querySelectorAll("div");
position2 = hola[1]
let p1 = document.createElement("p");
p1.textContent = "Voy en medio!";

position2.before(p1)
    
// 2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here
let cambiados = document.querySelectorAll("div.fn-insert-here");


for (let cada of cambiados) {
	let p2 = document.createElement("p");
	p2.textContent = "Voy dentro!";
	cada.append(p2);
}

console.log(cambiados)
