// 1.1 Basandote en el array siguiente, crea una lista ul > li 
// dinámicamente en el html que imprima cada uno de los paises.
const countries = ['Japón', 'Nicaragua', 'Suiza', 'Australia', 'Venezuela'];

const ul = document.createElement("ul");
const body = document.querySelector("body")
body.append(ul);

for (let pais of countries) {
    const li = document.createElement("li");
    ul.append(li);
    li.textContent = pais
}

// 1.2 Elimina el elemento que tenga la clase .fn-remove-me.

let eliminado = document.querySelector(".fn-remove-me");
eliminado.remove();

// 1.3 Utiliza el array para crear dinamicamente una lista ul > li de elementos 
// en el div de html con el atributo data-function="printHere".
const cars = ['Mazda 6', 'Ford fiesta', 'Audi A4', 'Toyota corola'];

const div = document.querySelector("[data-function='printHere']");
const ul2 = document.createElement("ul");
div.append(ul2);

for (let car of cars) {
    const li2 = document.createElement("li");
    ul2.append(li2);
    li2.textContent = car;
}

// 1.4 Crea dinamicamente en el html una serie de divs que contenga un elemento 
// h4 para el titulo y otro elemento img para la imagen.
const countries2 = [
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=1'}, 
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=2'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=3'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=4'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=5'}
];

for (let item of countries2) {
    let div2 = document.createElement("div");
    body.append(div2);
    for (let property in item) {
        if (property == "title") {
            let h4 = document.createElement("h4");
            div2.append(h4);
            h4.textContent = item[property]
        } else if (property == "imgUrl") {
        let img = document.createElement("img");
        div2.append(img);
        img.src = item[property]
        // div2.insertAdjacentHTML("beforeend", `<img src=${item[property]}/>`)
        }
    }
}

// 1.5 Basandote en el ejercicio anterior. Crea un botón que elimine el último 
// elemento de la serie de divs.
let divsalmacenados = document.querySelectorAll("div")
let diveliminado = divsalmacenados[5];


let button = document.createElement("button"); // 
body.prepend(button);
button.addEventListener("click", (evento) => diveliminado.remove());

// 1.6 Basandote en el ejercicio anterior. Crea un botón para cada uno de los 
// divs que elimine ese mismo elemento del html.

for (let a = 1; a < 6; a++) {
    let button2 = document.createElement("button")
    divsalmacenados[a].before(button2);
    button2.addEventListener("click", (evento) => divsalmacenados[a].remove());
}
