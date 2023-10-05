// #6 Función Swap
let newArray = ['Mesirve', 'Cristiano Romualdo', 'Fernando Muralla', 'Ronalguiño']


const swap = (array, param1, param2) => {
    let ind1 = array[param1];
    let ind2 = array[param2];
    if (array.length > param1 && array.length > param2) {
        array.splice(param1, 1, ind2);
        array.splice(param2, 1, ind1);
        return array;
    } else {
        return "no se encuentra el elemento";
    }
}
console.log(swap(newArray, 0, 3));