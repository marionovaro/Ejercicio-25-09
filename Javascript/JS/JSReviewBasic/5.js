// #5 RollDice
const rollDice = (myMin, myMax) => {
    return Math.floor(Math.random()*(myMax - myMin +1)) + myMin;
}
console.log(rollDice(1, 6));