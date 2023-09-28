const nameFinder = [
    'Peter',
    'Steve',
    'Tony',
    'Natasha',
    'Clint',
    'Logan',
    'Xabier',
    'Bruce',
    'Peggy',
    'Jessica',
    'Marc'
  ];
const finderName = (name, array) => {
    let status = ""
    let position = ""
    if (array.includes(name)) {
        status = true
    } else {
        status = false
    }
    for(let a = 0 ; a < array.length ; a++) {
        if (array[a] == name) {
            position = a
        } 
    }
    return (status + ", y la posición es: " + position)
    
}

console.log(finderName("Clint", nameFinder));





// for(let a = 0 ; a < array ; a++) {
//     if (array[a] == name) {
//         status = true;
//         position = a
//     } else {
//         status = false;
//     }

// }
