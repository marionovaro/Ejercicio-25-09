// #5 Filter
// 5.1
const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];

const newAges = ages.filter(age => age > 18);
console.log(newAges);

// 5.2
const ages2 = [22, 14, 24, 55, 65, 21, 12, 13, 90];

const newAges2 = ages2.filter(age => age % 2 === 0);
console.log(newAges2)

// 5.3
const streamers = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'}, 
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];
const newStreamers = streamers.filter(streamer => streamer.gameMorePlayed == "League of Legends");
console.log(newStreamers)

// 5.4
const streamers2 = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];
const newStreamers2 = streamers2.filter(streamer => streamer.name.includes("u"));
console.log(newStreamers2);

// 5.5
const lastStreamers = streamers.filter(streamer => streamer.gameMorePlayed.includes("Legends"))
for(let streamer of lastStreamers) {
    streamer.age > 35 ? streamer.gameMorePlayed = streamer.gameMorePlayed.toUpperCase(): null;
}
console.log(lastStreamers)

// 5.6 no hacer aún
// 5.7 no hacer aún
