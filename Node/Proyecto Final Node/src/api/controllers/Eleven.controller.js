const setError = require("../../helpers/handle-error");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { enumPositionOk, enumPreferredFootOk } = require("../../utils/enumOk");
const Player = require("../models/Player.model");
const Team = require("../models/Team.model");
const User = require("../models/User.model");


const create = async (req, res, next) => {
    try {
        await Eleven.syncIndexes() //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
        //todo ------------ VAMOS A ASEGURARNOS QUE LOS JUGADORES SELECCIONADOS SON DE SUS FAVORITOS, Y ESTAN EN LA POSICION CORRECTA ----------------
        const propiedad = req.body[position]
        switch (position) {
            case "goalkeeper":
            case "rightback":
            case "centreback1":
            case "centreback2":
            case "leftback":
            case "midfielder1":
            case "midfielder2":
            case "midfielder3":
            case "forward1":
            case "forward2":
            case "forward3":
                const player = 
                
                break;
        
            default:
                break;
        }
        
        const newEleven = new Eleven(req.body) //? --------------------- instanciamos un nuevo jugador y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
        const saveEleven = await newEleven.save(); //? ---------------------- GUARDAMOS EL JUGADOR EN LA BASE DE DATOS (DB) O BACKEND
        
        return res //? evaluamos si existe saveEleven y por lo tanto se ha guardado bien y mostramos exito o error
            .status(saveEleven ? 200 : 404)
            .json(saveEleven ? saveEleven : {message: "No se ha podido guardar el 11 ideal en la DB ❌", error: error.message} )

    } catch (error) { //? --------------------------------------------- si ha habido un error creando el jugador: 
        return next(setError(500, error.message || "Error general al crear tu 11 ideal ❌"))
    }
};