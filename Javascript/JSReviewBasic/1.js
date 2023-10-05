// #1 Mix for...of & includes
const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]

let newArray = []

for (let pelis of movies) {
    for (let a = 0; a < pelis.categories.length; a++){
    newArray.includes(pelis.categories[a]) ? null : newArray.push(pelis.categories[a])
}
}
console.log(newArray);