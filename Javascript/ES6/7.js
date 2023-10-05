// #7 Reduce
// 7.1
const exams = [
    {name: 'Yuyu Cabeza Crack', score: 5}, 
    {name: 'Maria Aranda Jimenez', score: 1}, 
    {name: 'Cristóbal Martínez Lorenzo', score: 6}, 
    {name: 'Mercedez Regrera Brito', score: 7},
    {name: 'Pamela Anderson', score: 3},
    {name: 'Enrique Perez Lijó', score: 6},
    {name: 'Pedro Benitez Pacheco', score: 8},
    {name: 'Ayumi Hamasaki', score: 4},
    {name: 'Robert Kiyosaki', score: 2},
    {name: 'Keanu Reeves', score: 10}
];

const notas = exams.reduce((acc, cur) => acc + cur.score, 0)
console.log(notas);

// 7.2
const notasAprobadas = exams.reduce((acc, cur) => cur.score >= 5 ? acc + cur.score : acc, 0)
console.log(notasAprobadas);

// 7.3
const mediaNotas = exams.reduce((acc, cur) => acc + cur.score, 0)/exams.length;
console.log(mediaNotas);