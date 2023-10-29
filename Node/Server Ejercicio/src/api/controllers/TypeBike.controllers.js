const Bike = require("../models/Bike.model");
const TypeBike = require("../models/TypeBike.model");

//? CONTROLADORES DE LOS MODELOS

//! ---------------------------------------------------------------------
//? ---------------------------- POST CREATE ----------------------------
//! ---------------------------------------------------------------------
const createTypeBike = async (req, res, next) => {
    console.log(req.body)
    try {
        await TypeBike.syncIndexes();  //? .------------------- busca las actualizaciones, por si se ha modficado el modelo tipo de moto
        const newTypeBike = new TypeBike(req.body); //? --------------------- instanciamos un nuevo tipo de moto y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
        const savedTypeBike = await newTypeBike.save(); //? ----------------- guardamos el tipo de moto en la DB o BackEnd con la info introducida
        return res
            .status(savedTypeBike ? 200 : 404)
            .json(savedTypeBike ? savedTypeBike : "no se ha podido guardar el tipo de moto ❌");
    } catch (error) {
        res.status(404).json({
            error: "error en el creado - (catch)",
            message: error.message
        });
    }
};

//! ---------------------------------------------------------------------
//? ---------------- ADD/DELETE UNA MOTO ---> TOGGLE --------------------
//! ---------------------------------------------------------------------
const toggleBike = async (req, res, next) => {
    try {
        const {id} = req.params; //? -------------- obtenemos el id del tipo de moto que queremos cambiar
        console.log({id})
        const {bikes} = req.body; //! -------------- enviaremos esto por el req.body "12412242253,12535222232,12523266346" ??????????????
        const typebikeById = await TypeBike.findById(id); //? ----------- guardamos en variable el tipo de moto buscado por id
        if (typebikeById) {
            const arrayIdTypeBike = bikes.split(",") //? ----------- los id de las motos que metemos en el body (línea 31) las metemos en un array y las separamos por comas
            Promise.all(
                arrayIdTypeBike.map(async (bike) => { //? --------- recorremos el array que hemos creado con las motos
                    console.log(bike)
                    if (typebikeById.bikes.includes(bike)) { //? -- si la moto ya está dentro del tipo de moto:     
                        console.log("Lo incluyo")
                        //! ---------- SACAMOS - $PULL ------------- !// (sacamos la moto del tipo de motos (está dentro de un array en forma de id, y sacamos este id))

                        try {
                            await TypeBike.findByIdAndUpdate(id, {
                                $pull: { bikes: bike} //? -------------- dentro de la clave bikes me vas a sacar el id del elemento que estoy recorriendo (bike)
                            })

                            try { //? ------------------- ahora ya hemos sacado la moto del tipo de moto, ahora SACAMOS EL TIPO DE MOTO DEL ELEMENTO MOTO --> elementos relacionados entre sí (si uno no tiene el otro, el otro no tiene uno)
                                await Bike.findByIdAndUpdate(bike, {
                                    $pull: { type: id }, //? -------------- hemos sacado el id del biketype dentro del elemento moto (para que si mt07 no está en naked, naked no esté en mt07)
                                })
                            } catch (error) {
                                res.status(404).json({
                                    error: "error update Bike",
                                    message: error.message,
                                  })
                            }
                        } catch (error) {
                            res.status(404).json({
                                error: "error update Bike Type",
                                message: error.message,
                              });
                        }
                    } else {
                         //! ---------- METEMOS - $PUSH ------------- !// (metemos la moto en el tipo de motos (dentro de un array en forma de id, metemos este id))

                         try {
                            await TypeBike.findByIdAndUpdate(id, {
                                $push: { bikes: bike} //? -------------- dentro de la clave bikes me vas a introducir el id del elemento que estoy recorriendo (bike)
                            })

                            try { //? ------------------- ahora ya hemos introducido la moto en el tipo de moto, ahora METEMOS EL TIPO DE MOTO DEL ELEMENTO MOTO --> elementos relacionados entre sí (si uno tiene el otro, el otro tiene uno)
                                await Bike.findByIdAndUpdate(bike, {
                                    $push: { type: id }, //? -------------- hemos introducido el id del biketype dentro del elemento moto (para que si mt07 está en naked, naked esté en mt07)
                                })
                            } catch (error) {
                                res.status(404).json({
                                    error: "error update Bike",
                                    message: error.message,
                                  })
                            }
                        } catch (error) {
                            res.status(404).json({
                                error: "error update Bike Type",
                                message: error.message,
                              });
                        }
                    }
                })
            ).then(async () => {
                return res.status(200).json({
                    dataUpdate: await TypeBike.findById(id),
                });
            });
        } else {
            res.status(404).json("este tipo de moto no existe ❌")
        }
    } catch (error) {
        return (
            res.status(404).json({
                message: "error en el buscado - catch",
                error: error.message,
            })
        );
    }
};

//! ---------------------------------------------------------------------
//? ---------------------------- GET BY ID ------------------------------
//! ---------------------------------------------------------------------
const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const typebikeById = await TypeBike.findById(id)
        return res
            .status(typebikeById ? 200 : 404)
            .json(typebikeById ? typebikeById : "no se ha encontrado el tipo de moto con ese id ❌");
    } catch (error) {
        return res.status(404).json({message: "error en el buscado - catch", error: error.message})
    }
}

//! ---------------------------------------------------------------------
//? --------------------------- GET ALL ---------------------------------
//! ---------------------------------------------------------------------
const getAll = async (req, res, next) => {
    try {
        const allTypeBike = await TypeBike.find();
        return res
            .status(allTypeBike.length > 0 ? 200 : 404)
            .json(allTypeBike.length > 0 ? allTypeBike  : "no se han encontrado tipos de moto en la DB o BackEnd ❌")
    } catch (error) {
        return res.status(404).json({message: "error en el buscado - catch", error: error.message})
    }
}

//! ---------------------------------------------------------------------
//? --------------------------- GET BY MODEL ----------------------------
//! ---------------------------------------------------------------------
const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const typebikeByName = await TypeBike.find({name});
        return res
        .status(typebikeByName.length > 0 ? 200 : 404)
        .json(typebikeByName.length > 0 ? typebikeByName  : "no se han encontrado tipos de moto con ese nombre en la DB o BackEnd ❌")
    } catch (error) {
        return res.status(404).json({message: "error en el buscado - catch", error: error.message})
    }
}

//! ---------------------------------------------------------------------
//? ------------------------------ UPDATE -------------------------------
//! ---------------------------------------------------------------------
const update = async (req, res, next) => {
    await TypeBike.syncIndexes();
    try {
        const {id} = req.params;
        const typebikeById = await TypeBike.findById(id);
        if (typebikeById) {
            const customBody = {
                _id: typebikeById._id,
                name: req.body?.name ? req.body.name : typebikeById.name,
                use: req.body?.use ? req.body.use : typebikeById.use,
            }
        
        try {
            await TypeBike.findByIdAndUpdate(id, customBody);
//!           -------------------
//!           | RUNTIME TESTING |
//!           -------------------
            const typebikeByIdUpdted = await TypeBike.findById(id)
            const elementUpdate = Object.keys(req.body);
            let test = [];

            elementUpdate.forEach((key) => {
                req.body.key == typebikeByIdUpdted.key ? test.key = true : test.key = false;
            })

            let acc = 0
            for (let clave in test) {
                test.clave == false ? acc++ : null;
            }

            acc > 0
                ? res.status(404).json({dataTest: test, update: falsel})
                : res.status(200).json({dataTest: test, update: true});

        } catch (error) {
            return res.status(404).json({message: "error en el buscado - catch", error: error.message})
        }
        } else {
            return res.status(404).json("este tipo de moto no existe ❌")
        }
    } catch (error) {
        return res.status(404).json({message: "error en el buscado - catch", error: error.message})
    }
}

//! ---------------------------------------------------------------------
//? ---------------------------- DELETE ---------------------------------
//! ---------------------------------------------------------------------
const deleteTypeBike = async (req, res, next) => {
    try {
        const {id} = req.params;
        const typebike = await TypeBike.findByIdAndDelete(id);
        if (typebike) {
            const findByIdTypeBike = await TypeBike.findById(id);
            const test = await Bike.updateMany(
                {type: id},
                {$pull: {type: id}}
            )

            return res.status(findByIdTypeBike ? 404 : 200).json({deleteTest: findByIdTypeBike ? false : true})
        } else {
            return res.status(404).json("este tipo de moto no existe ❌")
        }
    } catch (error) {
        return res.status(404).json({message: "error en el buscado de tipo de moto - catch", error: error.message})
    }
}


module.exports = {
    createTypeBike, 
    toggleBike,
    getById,
    getAll,
    getByName,
    update,
    deleteTypeBike
};