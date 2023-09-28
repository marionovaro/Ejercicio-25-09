// #3 Calcular la suma
const numbers = [1, 2, 3, 5, 45, 37, 58];

const sumAll = (x) => {
    let suma = 0
    for (let a = 0 ; a < x.length ; a++) {
        suma = suma + x[a];
    }
    return suma;
}

console.log(sumAll(numbers));