// #4 Calcular el promedio
const numbers = [12, 21, 38, 5, 45, 37, 6];

const average = (x) => {
    let suma = 0
    for(let a = 0; a < x.length ; a++) {
        suma = suma + x[a];
    }
    suma = suma / x.length;
    return suma;
}

console.log(average(numbers));