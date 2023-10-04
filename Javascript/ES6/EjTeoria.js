const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
]

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const four = numbers.find(function(number) {
    return number === 4
})

// console.log(four)

// ------------------

const scores = [90, 75, 60, 100, 85];

const average = scores.reduce((acc, cur) => acc + cur)/scores.length;
// console.log(average);

// -------------------

var pilots = [ 
	{ id: 10, name: "Poe Dameron", years: 14, }, 
	{ id: 2, name: "Temmin 'Snap' Wexley", years: 30, }, 
	{ id: 41, name: "Tallissan Lintra", years: 16, }, 
	{ id: 99, name: "Ello Asty", years: 22, }
];

const añosTotales = pilots.reduce((acc, pilot) =>  acc + pilot.years, 0)
// console.log(añosTotales)

const masExperimentado = pilots.reduce(function(acc, pilot) {
  return pilot.years > acc.years ? pilot : acc; // preguntar sobre esto a Laura, supuestamente acc no puede acceder a propiedades de objetos
})
// console.log(masExperimentado);

// ----------------------- sumar los scores totales solamente de los que usen la fuerza

var personnel = [ 
	{ id: 5, name: "Luke Skywalker", pilotingScore: 98, shootingScore: 56, isForceUser: true, }, 
	{ id: 82, name: "Sabine Wren", pilotingScore: 73, shootingScore: 99, isForceUser: false, }, 
	{ id: 22, name: "Zeb Orellios", pilotingScore: 20, shootingScore: 59, isForceUser: false, }, 
	{ id: 15, name: "Ezra Bridger", pilotingScore: 43, shootingScore: 67, isForceUser: true, }, 
	{ id: 11, name: "Caleb Dume", pilotingScore: 71, shootingScore: 85, isForceUser: true, }
];

let forceUsers = personnel.filter(soldado => soldado.isForceUser === true);
// let score = forceUsers.reduce(function(acc, soldado) {
//   return acc + soldado.pilotingScore + soldado.shootingScore
// }, 0)
let score = forceUsers.reduce((acc, soldado) => acc + soldado.pilotingScore + soldado.shootingScore, 0) // es lo mismo que lo comentado, solo que está en función arrow
console.log(score)


