const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const enumOk = require("../../utils/enumOk");
const Bike = require("../models/Bike.model");
const TypeBike = require("../models/TypeBike.model");

//? CONTROLADORES DE LOS MODELOS

//! ---------------------------------------------------------------------
//? ------------------------------- POST CREATE -------------------------
//! ---------------------------------------------------------------------


const create = async (req, res, next) => {
    let catchImg = req.file?.path //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
    try {
        await Bike.syncIndexes() //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
        const newBike = new Bike(req.body) //? --------------------- instanciamos una nueva moto y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
        if (req.file) { //? -------------------- miramos si en la request hay imagen. Si la hay, la introducimos a la nueva moto
            newBike.image = catchImg;
        } else {
            newBike.image = "https://www.svgrepo.com/show/9746/motorcycle-of-big-size-black-silhouette.svg"
        }

    const saveBike = await newBike.save(); //? ---------------------- GUARDAMOS LA MOTO EN LA BASE DE DATOS (DB) O BACKEND
        if (saveBike) { 
            res.status(200).json(saveBike);
        } else {
            return res.status(404).json("No se ha podido guardar el elemento en la DB ❌")
        }
        
    } catch (error) { //? ------------------------ si ha habido un error subiendo la imagen, hay que borrarla, ya que ya se ha subido a cloudinary. Se ha hecho en la primera línea de esta función
        req.file?.path ? deleteImgCloudinary(catchImg) : null;
        return res.status(404).json({
            message: "error en el creado de la moto ❌",
            error: error,
        }) && next(error)
    }
};

module.exports = {create}

//! ---------------------------------------------------------------------
//? ---------------------------- GET BY ID ------------------------------
//! ---------------------------------------------------------------------

const getById = async (req, res, next) => {
    try {
        const {id} = req.params; //!!!!!!!!!!!!!! ---- DE DONDE SALE EL ID
        const bikeById = await Bike.findById(id); //? cogemos el elemento (moto) identificandola a través del id, que es único
        if (bikeById) { //? -------------------------- si hay un elemento con dicho id ----------------------------------------------- (¿PUEDE NO HABERLO?)
            return res.status(200).json(bikeById);
        } else {
            return res.status(404).json("no se ha encontrado la moto ❌") //! ----------------------- PORQUE A VECES PONEMOS CONSOLE.LOG Y A VECES PONEMOS JSON PARA INDICAR UN ERROR (db:25) Y OTRAS VECES ERROR + MENSAJE (esta:70)
        }
    } catch (error) {
        return res.status(404).json(error.message)
    }
};

//! ---------------------------------------------------------------------
//? --------------------------- GET ALL ---------------------------------
//! ---------------------------------------------------------------------

const getAll = async (req, res, next) =>  {
    console.log("entro")
    try {
        const allBikes = await Bike.find() //? ------------- el find() nos devuelve un array con todos los elementos de la colección del BackEnd, es decir, TODAS LAS MOTOS
        console.log(allBikes)
        if (allBikes.length > 0) {  //? --------------------------- SI HAY MOTOS:
            return res.status(200).json(allBikes);
        } else {
            return res.status(404).json("no se han encontrado motos en la colección (BackEnd) ❌")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar motos en la colección ❌",
            message: error.message
        });
    }
};

//! ---------------------------------------------------------------------
//? --------------------------- GET BY MODEL ----------------------------
//! ---------------------------------------------------------------------

const getByModel = async (req, res, next) => { //? ----------------- es igual que el getById
    try {
        const {model} = req.params;
        console.log(model + " hola")
        const bikeByModel = await Bike.find({model});
        // console.log(bikeByModel.length + "hola")
        if (bikeByModel.length > 0) {
            return res.status(200).json(bikeByModel);
        } else {
            return res.status(404).json("no se han encontrado motos a través de model ❌")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar a través del model ❌",
            message: error.message
        });
    }
};

//! ---------------------------------------------------------------------
//? ------------------------------ UPDATE -------------------------------
//! ---------------------------------------------------------------------

const update = async (req, res, next) => {
    await Bike.syncIndexes(); //? .------------------- busca las actualizaciones, por si se ha modficado el modelo moto
    let catchImg = req.file?.path; //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
    try {
        const {id} = req.params; //? ------------------- en esta linea y la siguiente hacemos lo mismo que en getById
        const bikeById = await Bike.findById(id);
        if (bikeById) {
            const oldImg = bikeById.image //? ------------- guardamos la imagen que había antes en el elemento
            
            const customBody = {
                _id: bikeById._id, //? ---------- ponemos _.id porque así lo pone en insomnia
                image: req.file?.path ? catchImg : oldImg, //? -------------- si en el param hay una nueva imagen la ponemos en el lugar de la que había, si no hay una nueva, se deja la que había
                mark: req.body?.mark ? req.body.mark : bikeById.mark,
                model: req.body?.model ? req.body.model : bikeById.model,
                engine: req.body?.engine ? req.body.engine : bikeById.engine,
                year: req.body?.year ? req.body.year : bikeById.year,
            };
            //! ------------------------------------------------------------------- AÑADIR IF DE ENUM (CYLINDERS)

            if (req.body?.cylinders) {
                const resultEnum = enumOk(req.body?.cylinders);
                customBody.cylinders = resultEnum.check
                    ? req.body?.cylinders
                    : bikeById.cylinders
            }
        
        try {
            await Bike.findByIdAndUpdate(id, customBody); //? cambiamos el body con lo que hemos puesto en customBody en el elemento que encontremos con el id
            if (req.file?.path) {
                deleteImgCloudinary(oldImg);
            }
//!           -------------------
//!           | RUNTIME TESTING |
//!           -------------------

            const bikeByIdUpdated = await Bike.findById(id) //? ---- buscamos el elemento actualizado a través del id
            const elementUpdate = Object.keys(req.body); //? ------- buscamos los elementos de la request para saber qué se tiene que actualizar
            let test = []; //? ------------------------------------- objeto vacío donde meter los tests. estará compuesta de las claves de los elementos y los valores seran true/false segun haya ido bien o mal

            elementUpdate.forEach((key) => { //? ------------------ recorremos las claves de lo que se quiere actualizar
                if (req.body[key] === bikeByIdUpdated[key]) { //? ---------- si el valor de la clave en la request (el valor actualizado que hemos pedido meter) es el mismo que el que hay ahora en el elemento ---> está bien
                    test[key] = true; //? ----------------------------- está bien hecho por lo tanto en el test ponemos true --> test aprobado hehe
                } else {
                    test[key] = false; //? ---------------------------- algo ha fallado y por lo tanto el test está suspendido (false)
                }
            });

            if (catchImg) {
                bikeByIdUpdated.image = catchImg //? ------------------ si la imagen en la request es la misma que la que hay ahora en el elemento
                    ? (test = { ...test, file: true}) //? ------------- hacemos una copia de test y le decimos que en file (foto) es true, ha ido bien
                    : (test = { ...test, file: false}) //? ------------ hacemos una copia de test y le decimos que en file (foto) es false, ha ido mal
            }

            let acc = 0
            for (clave in test) { //? -------------------- recorremos tests
                test[clave] == false ? acc++ : null; //? - si el valor es false es que algo ha fallado y le sumamos al contador de fallos
            }
            
            if (acc > 0) {
                return res.status(404).json({
                    dataTest: test,
                    update: false
                });
            } else {
                return res.status(404).json({
                    dataTest: test,
                    update: true
                })
            }
        } catch (error) {/*porque no ponemos nada en el catch error*/}
        } else {
            return res.status(404).json("esta moto no existe ❌")
        }
    } catch (error) {
        return res.status(404).json(error);
    }
};

//! ---------------------------------------------------------------------
//? ---------------------------- DELETE ---------------------------------
//! ---------------------------------------------------------------------

const deleteBike = async (req, res, next) => {
    try {
        const {id} = req.params;
        const bike = await Bike.findByIdAndDelete(id); //? buscamos la moto y la eliminamos

        if (bike) {
            const findByIdBike = await Bike.findById(id); //? hemos encontrado esta moto? no debería existir porque  la hemos eliminado en 2 lineas antes

            try {
                const test = await TypeBike.updateMany(
                    {bikes: id},
                    {$pull: {bikes: id}}
                )
            } catch (error) {
                
            }
            
            return res.status(findByIdBike ? 404 : 200).json({ //? si se encuentra hay un error, porque no se ha eliminado
                deleteTest: findByIdBike ? false : true, //? si existe el test ha dado fallo y si no existe ha aprobado el test
            });
        } else {
            return res.status(404).json("esta moto no existe ❌"); //? si no existe la moto antes de eliminarla hay que dar error porque la moto seleccionada para borrar no existia en un primer momento
        }
    } catch (error) {
        return res.status(404).json(error);
    }
};

module.exports = {
    create,
    getById,
    getAll,
    getByModel,
    update,
    deleteBike
};