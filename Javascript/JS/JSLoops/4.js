// #4 Probando For...in
const alien = {
    name: 'Wormuck',
    race: 'Cucusumusu',
    planet: 'Eden',
    weight: '259kg'
}

for (let specs in alien) {
    console.log(`${specs}: ${alien[specs]}`);
}