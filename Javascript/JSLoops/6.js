// #6 Mixed for...of e includes
const toys = [
    {id: 5, name: 'Buzz MyYear'}, 
    {id: 11, name: 'Action Woman'}, 
    {id: 23, name: 'Barbie Man'}, 
    {id: 40, name: 'El gato con Guantes'},
    {id: 40, name: 'El gato felix'}
    ]

let newArray = [];
for (let juguete of toys) {
    // clave = Object.keys(juguete);
    // valor = Object.values(juguete)
    for (let inJuguete in juguete)
    clave = Object.keys(inJuguete);
    valor = Object.values(inJuguete)
    // if (valor.includes("gato")) {
    //     newArray.push(juguete);
    // }
    // console.log(`${clave}: ${valor}`)
    // for (let subJuguete in juguete) {
    //     if ()
    // }
    console.log(clave)
}
console.log(newArray);

