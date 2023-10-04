// #4 Map
// 4.1
const users = [
	{id: 1, name: 'Abel'},
	{id:2, name: 'Julia'},
	{id:3, name: 'Pedro'},
	{id:4, name: 'Amanda'}
];

const names = users.map(user => user.name);
console.log(names);

// 4.2
const newNames = users.map(user => user.name)
    .map(name => name[0]=="A" ? name="Anacleto" : name)
console.log(newNames)

// 4.3
const cities = [
	{isVisited:true, name: 'Tokyo'}, 
	{isVisited:false, name: 'Madagascar'},
	{isVisited:true, name: 'Amsterdam'}, 
	{isVisited:false, name: 'Seul'}
];

const visited = cities.map(city => city.isVisited == true ? city.name += " (Visitado)" : city.name);
console.log(visited)