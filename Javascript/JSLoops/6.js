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
    !juguete.name.includes("gato") ? newArray.push(juguete): null;
}
// Haciendo nombreObjeto.nombreClave se llega la valor, recuérdalo!!!



    // for (let clave in juguete) {
       
    // console.log(juguete["name"])
    // }
    // 
    // for (let a = 0; a < juguete.length; a++) { /* esto no se si es necesario,estoy probando*/
    //     valor[a].includes("gato") ? newArray.push(juguete) : null
    // }


    // for (let inJuguete in juguete)
    // if (valor.includes("gato")) {
    //     newArray.push(juguete);
    // }
    // console.log(`${clave}: ${valor}`)
    // for (let subJuguete in juguete) {
    //     if ()
    // }

console.log(newArray)


