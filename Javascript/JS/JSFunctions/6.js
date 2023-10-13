// # Valores únicos
const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
  ];
  let newArray = [];
  const removeDuplicates = (x) => {
    for(let a = 0 ; a < x.length ; a++) {
        if (newArray.includes(x[a]) == true) {
            null;
        } else if (x.includes(x[a]) == true) {
            newArray.push(x[a]);
        }
    }
    return newArray;
  }

  console.log(removeDuplicates(duplicates));
  