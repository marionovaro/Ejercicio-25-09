const fs /*(file system)*/ = require("node:fs") // es buena práctica incluir el node: dentro de cualquier require. lo pone en la documentación de node

console.log("leyendo 1r archivo")
fs.readFile("./archivo.txt", "utf-8", (err, text) => { // le decimos que ejecute lo que hay en la callback cuando nosotros le digamos (cuando termine de leer el archivo)
    console.log("primer texto:", text) // Hola mundo como estáis?
})  

console.log("haciendo otras cosas...")

console.log("leyendo 2o archivo")
fs.readFile("./archivo2.txt", "utf-8", (err, text) => { // no hace falta atribuirle a una variable porque se ejecuta en la callback
    console.log("segundo texto:", text) // klk paso mi gente...
})




//!-----CONSOLA:
//? leyendo 1r archivo
//? haciendo otras cosas... ------------- ahora sí que nos permite ejecutar las otras cosas sin haber acabado las primeras tareas, de hecho el orden no lo escogemos nosotros, según vayan acabando se van ejecutando. el primer texto ha llegado el último
//? leyendo 2o archivo
//? segundo texto: klk paso mi gente
//? saludos desde barcelona
//? yeeeepa voy
//? primer texto: Hola mundo como estáis?