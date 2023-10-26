const fs /*(file system)*/ = require("node:fs") // es buena práctica incluir el node: dentro de cualquier require. lo pone en la documentación de node

console.log("leyendo 1r archivo")
const text = fs.readFileSync("./archivo.txt", "utf-8") // el 2o param es la codificación en la que queremos recibir los datos

console.log(text) // Hola mundo como estáis?

console.log("haciendo otras cosas...")

console.log("leyendo 2o archivo")
const text2 = fs.readFileSync("./archivo2.txt", "utf-8")

console.log(text2)


//!-----CONSOLA:
//? leyendo 1r archivo
//? Hola mundo como estáis? 
//? haciendo otras cosas...   ----------  no nos permite hacer otras cosas hasta que lo que viene antes no se ha completado, porque es síncrono 
//? leyendo 2o archivo
//? klk paso mi gente
//? saludos desde barcelona
//? yeeeepa voy