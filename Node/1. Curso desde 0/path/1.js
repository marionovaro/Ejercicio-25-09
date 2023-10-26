const path = require("node:path")

// barra de carpetas separadoras según SO (sistema operativo)
console.log(path.sep) // te da / porque es el elemento separador

//unir rutas con path.join
const filePath = path.join("content", "subfolder", "document.js")
console.log(filePath) // content\subfolder\document.js

//nombre de documento base
const base = path.basename("/1.Curso-desde-0/path/archivo.js")
console.log(base) // archivo.js

//obtener nombre extension
const extension = path.extname("image.jpg")
console.log(extension) //.jpg