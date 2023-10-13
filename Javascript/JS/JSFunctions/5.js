// #4 Calcular promedio de strings
const mixedElements = [6, 1, "Rayo", 1, "Vallecano", "10", "upgrade", 8, "hub"];

const averageWord = (x) => {
    let suma = 0
    for(let a = 0 ; a < x.length ; a++) {
        if (typeof x[a] == "number") {
            suma = suma + x[a];
        } else if (typeof x[a] == "string") {
            suma = suma + x[a].length;
        }
    }
    return suma;
}

console.log(averageWord(mixedElements));