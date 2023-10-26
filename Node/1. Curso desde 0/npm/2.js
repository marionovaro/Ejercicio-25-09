const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.' // por defecto nos coge el directorio actual (".). El [2] nos dice que coge el elemento en la posición 2 de nuestra orden en la consola (node[0] 2.js [1].... [2] ......[3])

async function ls (folder) { // creamos funcion con param folder para escoger la carpeta que queramos analizar previamente guardada en variable
  let files
  try {
    files = await fs.readdir(folder) // le decimos que lea los archivos del directorio (carpeta) escogida en el param y los guardamos en variable
  } catch {
    console.error(pc.red(`❌ No se pudo leer el directorio ${folder}`)) // ponemos un catch para si hay un error no nos pete la api entera
    process.exit(1) // si hay un error, salimos automaticamente
  }

  const filesPromises = files.map(async file => { // mapeamos los archivos previamente guardados en files
    const filePath = path.join(folder, file) // creamos el path de cada 
    let stats

    try {
      stats = await fs.stat(filePath) // le pedimos que recolecte la info de los archivos
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`) // mismo catch como antes. lo separamos en varios catch para que si falla sepamos qué ha fallado, un trato mucho más granulado
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f' // preguntamos si es directorio (capeta) o archivo y entonces ponemos d(carpeta) o f(archivo)
    const fileSize = stats.size.toString() // nos da la longitud o tamaño del archivo
    const fileModified = stats.mtime.toLocaleString() // nos devuelve la úlitma fecha de modificación

    return `${pc.white(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}` // representamos todo en la consola y separamos por colores con picocolor
  })

  const filesInfo = await Promise.all(filesPromises) // ejecuta la promise si se ha cumplido todas las promise del argumento

  filesInfo.forEach(fileInfo => console.log(fileInfo)) // nos muestre uno por uno los archivos y sus propiedades
}

ls(folder)