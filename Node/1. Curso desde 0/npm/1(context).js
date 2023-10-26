const fs = require("node:fs")

fs.readdir(".", (err, files) => { // en los callbacks, el err siempre va primero // el readdir lee el direcorio actual (".")
    if (err) {
        console.error("Error al leer el direcotrio: ", err)
        return;
    }

    files.forEach(file =>{
        console.log(file) // ----- nos da una lista con el nombre de los ficheros (dentro del archivo que abre la terminal (directorio actual))
    })
})