const counterWords = [
    'code',
    'repeat',
    'eat',
    'sleep',
    'code',
    'enjoy',
    'sleep',
    'code',
    'enjoy',
    'upgrade',
    'code'
  ];

// let newArray = [];
// let arrayRepeated = []
const removeDuplicates = (x) => {
  let objeto = {}
  x.forEach(i => {
   objeto.hasOwnProperty(i) ? objeto[i] += 1 : objeto[i] = 1
  console.log
  })
  return objeto
};
//   for(let a = 0 ; a < x.length ; a++) {
//       if (newArray.includes(x[a]) == true) {
//           arrayRepeated.push(x[a]);
//       } else if (x.includes(x[a]) == true) {
//           newArray.push(x[a]);
//       }
//   }
//   for(let b = 0; b < arrayRepeated.length; b++) {
    
//   }
//   return repeated
// }


console.log(removeDuplicates(counterWords));