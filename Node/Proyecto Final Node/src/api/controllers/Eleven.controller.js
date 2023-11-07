const setError = require("../../helpers/handle-error");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { enumPositionOk, enumPreferredFootOk } = require("../../utils/enumOk");
const Eleven = require("../models/Eleven.model");
const Player = require("../models/Player.model");
const Team = require("../models/Team.model");
const User = require("../models/User.model");

//! ---------------- CREATE -----------------
const create = async (req, res, next) => { //? para crear con id en vez de name, solo hay que cambiar el String, por ObjectId en el modelo, y aquí en vez de Player.findOne({name: body[propiedad]}) se haría con Player.findById(body[propiedad])
    try {
        await Eleven.syncIndexes() //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
        //todo ------------ VAMOS A ASEGURARNOS QUE LOS JUGADORES SELECCIONADOS ESTAN EN LA POSICION CORRECTA ----------------
        const body = req.body
        console.log(body)
        let elevenTeam = {} //? ----------------------------------------- aqui vamos a guardar los jugadores, si cumplen con la condición de las posición
        let errors = [] //? --------------------------------------------- aquí vamos a guardar los errores indicando, en qué jugador falla, si no se cumple la condición de la posición
        let player //? -------------------------------------------------- variable que va cambiando en el recorrido en la que metemos los jugadores y los introducimos en el array elevenTeam
        for (let propiedad in body) {
            switch (propiedad) { //? ------------------------------------ la propiedad es la posición en la que los hemos puesto
                case "goalkeeper":
                    player = await Player.findOne({name: body[propiedad]})//!.populate(propiedad) no puedo porque propiedad no existe en Player, se tiene que hacer cuando se haga un find o lksea en Eleven 
                    player.position == "goalkeeper" ? elevenTeam[propiedad] = player.name : errors.push({error: `El jugador en la posición ${propiedad} no está colocado en una posición apta para él`})
                    break;
                case "rightback":
                    player = await Player.findOne({name: body[propiedad]})
                    player.position == "right-back" ? elevenTeam[propiedad] = player.name : errors.push({error: `El jugador en la posición ${propiedad} no está colocado en una posición apta para él`})
                    break;
                case "centreback1":
                case "centreback2":
                    player = await Player.findOne({name: body[propiedad]})
                    player.position == "centre-back" ? elevenTeam[propiedad] = player.name : errors.push({error: `El jugador en la posición ${propiedad} no está colocado en una posición apta para él`})
                    break;
                case "leftback":
                    player = await Player.findOne({name: body[propiedad]})
                    player.position == "left-back" ? elevenTeam[propiedad] = player.name : errors.push({error: `El jugador en la posición ${propiedad} no está colocado en una posición apta para él`})
                    break;
                case "midfielder1":
                case "midfielder2":
                case "midfielder3":
                    player = await Player.findOne({name: body[propiedad]})
                    player.position == "midfielder" ? elevenTeam[propiedad] = player.name : errors.push({error: `El jugador en la posición ${propiedad} no está colocado en una posición apta para él`})
                    break;
                case "forward1":
                case "forward2":
                case "forward3":
                    player = await Player.findOne({name: body[propiedad]})
                    player.position == "forward" ? elevenTeam[propiedad] = player.name : errors.push({error: `El jugador en la posición ${propiedad} no está colocado en una posición apta para él`}) 
                    break;          
                default:
                    break;
            }
        }
        const newEleven = new Eleven(elevenTeam) //? ---------------------- instanciamos un nuevo 11 ideal y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
        const saveEleven = await newEleven.save(); //? ------------------ GUARDAMOS EL 11 IDEAL EN LA BASE DE DATOS (DB) O BACKEND
        return res //? evaluamos si existe saveEleven y por lo tanto se ha guardado bien y mostramos exito o error
            .status(saveEleven ? 200 : 404)
            .json(saveEleven ? saveEleven : errors )

    } catch (error) { //? --------------------------------------------- si ha habido un error creando el jugador: 
        return next(setError(500, error.message || "Error general al crear tu 11 ideal ❌"))
    }
};

//! --------------- GET by ID ----------------
const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const elevenById = await Eleven.findById(id); //? cogemos el elemento (eleven) identificandola a través del id, que es único
        return res
            .status(elevenById ? 200 : 404)
            .json(elevenById ? elevenById : "no se ha encontrado un 11 ideal con ese id ❌");

    } catch (error) {
        return res.status(404).json({message: "error en el GET by ID ❌ - catch general", error: error.message})
    }
};

//! --------------- GET ALL ----------------
const getAll = async (req, res, next) =>  {
    try {
        const allElevens = await Eleven.find() //? ------------- el find() nos devuelve un array con todos los elementos de la colección del BackEnd, es decir, TODOS LOS 11 IDEALES
        return res 
            .status(allElevens.length > 0 ? 200 : 404) //? ---- si hay equipos en la db (el array tiene al menos 1 elemento), 200 o 404
            .json(allElevens.length > 0 ? allElevens : {message: "No se han encontrado 11 ideales en la DB ❌", error: error.message}); 

    } catch (error) {
        return res.status(404).json({message: "error al buscar equipos en la colección ❌ - catch general", error: error.message});
    }
};

//! --------------- GET by NAME ----------------
const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const elevenByName = await Eleven.find({name});
        return res
            .status(elevenByName.length > 0 ? 200 : 404) //? igual que en get all, miramos si el array con ese nombre es mayor que 0 (solo debería de haber 1) y mostramos 200 o 404
            .json(elevenByName.length > 0 ? elevenByName : "no se ha encontrado un 11 ideal con ese nombre ❌");

    } catch (error) {
        return res.status(404).json({message: "error al buscar a través del name ❌ - catch general", error: error.message});
    }
};

//! ---------------- DELETE -----------------
const deleteEleven = async (req, res, next) => {
    try {
        const {id} = req.params;
        const eleven = await Eleven.findByIdAndDelete(id); //? buscamos el equipo y lo eliminamos

        if (eleven) { //? si el equipo que queremos eliminar existe (tiene que hacerlo para poder eliminarlo)

            try { //? ----------------------------------------- ELIMINAMOS AL EQUIPO, DEL JUGADOR
                const test = await Player.updateMany( //? ----- ahora estamos cambiando en el model de Player para poder quitar el equipo que ya no existe
                    {selected: id}, //? --------------------------- queremos cambiar lo que sea que haya que cambiar en esta propiedad del model, si se omite se dice que se cambia cualquier conincidencia en todo el modelo. es la condición
                    {$pull: {selected: id}} //? ------------------- estamos diciendo que quite de la propiedad eleven, el id indicado, es decir el del equipo que se ha eliminado. es la ejecución
                )
            } catch (error) {
                return res.status(404).json({message: "Error al eliminar el 11 ideal del jugador ❌", error: error.message})
            }

            // try { //? -------------------------------------- ELIMINAMOS AL EQUIPO DEL USER
            //     const test = await User.updateMany( //? ---- ahora estamos cambiando en el model de User para poder quitar el equipo que ya no existe
            //         {favTeams: id}, //? -------------------- condición/ubicación del cambio (eliminación)
            //         {$pull: {favTeams: id}} //? ------------ ejecución
            //     )
            // } catch (error) {
            //     return res.status(404).json({message: "Error al eliminar el equipo del usuario ❌", error: error.message})
            // }

            const findByIdEleven = await Eleven.findById(id); //? hemos encontrado este equipo? no debería existir porque lo hemos eliminado al ppio
            return res.status(findByIdEleven ? 404 : 200).json({ //? si se encuentra hay un error, porque no se ha eliminado
                deleteTest: findByIdEleven ? false : true, //? si existe, el test ha dado fallo y si no existe ha aprobado el test
            });
        } else {
            return res.status(404).json("este 11 ideal no existe ❌"); //? si no existe el jugador antes de eliminarlo hay que dar error porque el jugador seleccionado para borrar no existia en un primer momento
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al eliminar tu 11 ideal ❌"))
    }
}; 


module.exports = {
    create,
    getById,
    getAll,
    getByName,
    deleteEleven
}