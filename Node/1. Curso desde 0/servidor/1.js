const http = require("node:http") // protocolo http

const server = http.createServer((req, res) => { // request y respuesta. cada vez que se ejecuta el callback, es que ha recibido una request y por lo tanto, damos una res (respuesta)
    console.log("request recieved")
    res.end("hola mundo") // cuando recibo una peticion, respondo y termino la petición con "hola mundo"
})

server.listen(0, () => {
    console.log(`server listening on port http://localhost:${server.address().port}`)
})

// si nos sale que el server ya esta en uso, podemos poner el PORT en 0 para que coja uno vacíco automáticamente
// para saber que puerto ha escogido solo hay que poner server.address().port