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

const removeDuplicates = (x) => {
  let objeto = {}
  x.forEach(element, index, ar => {
   objeto.hasOwnProperty(element) ? objeto[element] += 1 : objeto[element] = 1
  console.log(objeto)
  })
  return objeto
};

console.log(removeDuplicates(counterWords));