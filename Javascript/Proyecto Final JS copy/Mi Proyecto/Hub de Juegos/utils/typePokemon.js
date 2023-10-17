export const typePokemon = (data) => {
    const typeName = []
    data.forEach((element) => { //? recorres todos los elementos hasta encontrar type
        element.type.forEach((singleType) => { //? recorres la clave tipo de cada elemento
            !typeName.includes(singleType.type.name) && typeName.push(singleType.type.name) //? si en el array de los tipos aun no está, incluye este o este otro tipo
        });
    });

    return typeName; //? devuelve array con todos los tipos
    console.log(typeName);
}