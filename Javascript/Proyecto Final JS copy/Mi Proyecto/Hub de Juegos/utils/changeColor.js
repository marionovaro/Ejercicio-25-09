export const changeColor = () => {
     const numberRandom = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.floor(Math.random() * (max - min + 1) + min);

        return random;
     }

     let R = numberRandom(0, 255);
     let G = numberRandom(0, 255);
     let B = numberRandom(0, 255);

     const color = `rgb(${R},${G},${B})`;
     return color;
     console.log(color)
}