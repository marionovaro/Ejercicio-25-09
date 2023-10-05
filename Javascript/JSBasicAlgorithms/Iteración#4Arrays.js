//1.1
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
console.log(avengers[0])

//1.2
avengers[0] = "IRONMAN"
console.log(avengers);
//otra forma
const avengersTwo = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
avengersTwo.shift();
avengersTwo.unshift("IRONMAN");
console.log(avengersTwo);

//1.3 
console.log(avengers.length);

//1.4
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];
rickAndMortyCharacters.push("Morty", "Summer");
console.log(rickAndMortyCharacters[4]);

//1.5
const rickAndMortyCharactersTwo = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharactersTwo.pop
console.log(rickAndMortyCharactersTwo[0], rickAndMortyCharactersTwo[4]);

//1.6
const rickAndMortyCharactersThree = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharactersThree.splice(1, 1);
console.log(rickAndMortyCharactersThree);
