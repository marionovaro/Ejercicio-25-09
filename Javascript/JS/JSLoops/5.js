// #5 Probando For
const placesToTravel = [{id: 5, name: 'Japan'}, {id: 11, name: 'Venecia'}, {id: 23, name: 'Murcia'}, {id: 40, name: 'Santander'}, {id: 44, name: 'Filipinas'}, {id: 59, name: 'Madagascar'}]

let newArray = [];
for (let a = 0; a < placesToTravel.length; a++) {
    // console.log(placesToTravel[a]);
    claves = Object.keys(placesToTravel[a]);
    valores = Object.values(placesToTravel[a]);
    // console.log(`${claves}: ${valores}`);
    for (let b = 0; b < claves.length; b++) {
        // console.log(valores[b])
        // Tiene que haber alguna forma de escribir esto justo abajo. Algo como valores[b] !== (11||40)
        ((claves[b]== "id") && (valores[b]!== 40 && valores[b]!== 11)) ? newArray.push(placesToTravel[a]) : null;
    }
}
console.log(newArray)