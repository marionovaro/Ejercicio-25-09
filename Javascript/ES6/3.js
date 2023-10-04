// #3 Spread Operator
// 3.1
const pointsList = [32, 54, 21, 64, 75, 43]

const pointsListCopy = [...pointsList]
console.log(pointsListCopy)

// 3.2
const toy = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};

const newToy = {...toy};
console.log(newToy);

// 3.3
const pointsLis1 = [32, 54, 21, 64, 75, 43];
const pointsLis2 = [54,87,99,65,32];

const pointsLis3 = [...pointsLis1, ...pointsLis2];
console.log(pointsLis3);

// 3.4
const toy1 = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};
const toyUpdate = {lights: 'rgb', power: ['Volar like a dragon', 'MoonWalk']}

const toy2 = {...toy1, ...toyUpdate};
console.log(toy2);

// 3.5
const colors = ['rojo', 'azul', 'amarillo', 'verde', 'naranja'];

const colors2 = [...colors];
colors2.splice(2, 1);
console.log(colors2, colors)