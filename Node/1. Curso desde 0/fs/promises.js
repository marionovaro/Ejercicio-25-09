const fs /*(file system)*/ = require("node:fs/promises") // con las promesas SE TIENE QUE INCLUIR PROMISES en el require

console.log("leyendo 1r archivo")
fs.readFile("./archivo.txt", "utf-8") 
    .then(text => { 
        console.log("primer texto:", text) // Hola mundo como estáis?
    })

console.log("haciendo otras cosas...")

console.log("leyendo 2o archivo")
fs.readFile("./archivo2.txt", "utf-8")
    .then(text => { 
        console.log("segundo texto:", text) // klk paso mi gente...
    })



//!-----CONSOLA:
//? leyendo 1r archivo
//? haciendo otras cosas... ------------- el resultado es el mismo que con async, porque tmb es async
//? leyendo 2o archivo
//? segundo texto: klk paso mi gente
//? saludos desde barcelona
//? yeeeepa voy
//? primer texto: Hola mundo como estáis?

//! SI QUISIERAS TRANSFORMAR DE CALLBACK A PROMISE SE PODRÍA A TRAVÉS DE PROMISIFY, INVESTIGA SI LO NECESITAS