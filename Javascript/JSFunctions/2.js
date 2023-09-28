const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

const cuenta = (x) => {
let long = 0
let palabraLarga = ""
for (let a = 0 ; a < x.length ; a++) {
        if (x[a].length > long) {
            long = x[a].length
            palabraLarga = x[a]
        }
}
return palabraLarga
}

console.log(cuenta(avengers));
