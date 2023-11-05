const setError = require("../../helpers/handle-error");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { enumPositionOk, enumPreferredFootOk, enumLeagueOk } = require("../../utils/enumOk");
const Player = require("../models/Player.model");
const Team = require("../models/Team.model");
const User = require("../models/User.model");

//! --------------- CREATE ----------------
const create = async (req, res, next) => {
    let catchImg = req.file?.path //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
    try {
        await Team.syncIndexes() //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
        const newTeam = new Team(req.body) //? --------------------- instanciamos un nuevo equipo y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
        req.file //? -------------------- miramos si en la request hay imagen. Si la hay, la introducimos al nuevo equipo
            ? newTeam.image = catchImg
            : newTeam.image = "https://canadasoccer.com/wp-content/themes/betheme-child/assets/generic_images/CS-NYCL_BlankPlaceholder.jpg"

        const saveTeam = await newTeam.save(); //? ---------------------- GUARDAMOS EL EQUIPO EN LA BASE DE DATOS (DB) O BACKEND     
        return res
            .status(saveTeam ? 200 : 404) //? si se  ha guardado correctamente o si no
            .json(saveTeam ? saveTeam : {message: "No se ha podido guardar el equipo en la DB ❌", error: error.message});   
        
    } catch (error) { //? -------------------------------------------- si ha habido creando el equipo:
        req.file?.path ? deleteImgCloudinary(catchImg) : null; //? --- hay que borrar la imagen, ya que ya se ha subido a cloudinary. Se ha hecho en la primera línea de esta función
        return res.status(404).json({
            message: "error en el creado del equipo ❌ - catch general",
            error: error.message
        }) && next(error)
    }
};

//! --------------- TOGGLE ----------------
const togglePlayer = async (req, res, next) => {
    try {
        const {id} = req.params; //? ---------------------------- obtenemos el id del equipo que queremos cambiar
        const {players} = req.body; //? ------------------------- enviaremos esto por el req.body "12412242253,12535222232,12523266346", que son los id de los jugadores del equipo
        const teamById = await Team.findById(id); //? ----------- guardamos en variable el equipo buscado por id
        if (teamById) { //? ------------------------------------- si equpio existe:
            const arrayIdPlayers = players.split(",") //? --------- los id de los jugadores que metemos en el body (4a linea funcion) las metemos en un array y las separamos por comas
            Promise.all(
                arrayIdPlayers.map(async (player) => { //? ------ recorremos el array que hemos creado lleno de players
                    if (teamById.players.includes(player)) { //?- si el jugador ya está dentro del tipo de moto:     
                        console.log("Lo incluyo")
                        //todo ---------- SACAMOS - $PULL ------------- !// (sacamos el jugador del equipo (está dentro de un array en forma de id, y sacamos este id))
                        try {
                            await Team.findByIdAndUpdate(id, {
                                $pull: { players: player} //? -------------- dentro de la clave players me vas a sacar el id del elemento que estoy recorriendo (player)
                            })

                            try { //? ------------------- ahora ya hemos sacado el jugador del equipo, ahora SACAMOS EL EQUIPO DEL ELEMENTO JUGADOR --> elementos relacionados entre sí (si uno no tiene el otro, el otro no tiene uno)
                                await Player.findByIdAndUpdate(player, {
                                    $pull: { team: id }, //? -------------- hemos sacado el id del equipo dentro del elemento jugador (para que si messi no está en fcb, fcb no esté en messi)
                                })
                            } catch (error) {
                                res.status(404).json({message: "Error al quitar el Equipo, del Jugador", error: error.message})
                            }
                        } catch (error) {
                            res.status(404).json({message: "Error al quitar el Jugador, del Equipo", error: error.message});
                        }
                    } else {
                         //todo ---------- METEMOS - $PUSH ------------- !// (metemos el jugador en el equipo (dentro de un array en forma de id, metemos este id))
                         try {
                            await Team.findByIdAndUpdate(id, {
                                $push: { players: player} //? -------------- dentro de la clave players (de Team) me vas a añadir el id del elemento que estoy recorriendo (player)
                            })

                            try { //? ------------------- ahora ya hemos metido el jugador al equipo, ahora METEMOS EL EQUIPO EN EL ELEMENTO JUGADOR --> elementos relacionados entre sí (si uno no tiene el otro, el otro no tiene uno)
                                await Player.findByIdAndUpdate(player, {
                                    $push: { team: id }, //? -------------- hemos metido el id del equipo dentro del elemento jugador (para que si messi está en fcb, fcb esté en messi)
                                })
                            } catch (error) {
                                res.status(404).json({message: "Error al añadir el Equipo, al Jugador", error: error.message})
                            }
                        } catch (error) {
                            res.status(404).json({message: "Error al añadir el Jugador, al Equipo", error: error.message});
                        }
                    }
                })
            ).then(async () => {
                return res.status(200).json({
                    dataUpdate: await Team.findById(id).populate("players"), //? mostramos el equipo que ya tiene los cambios hechos / el populate es para que no solo muestre los id
                });
            });
        } else {
            res.status(404).json("este equipo no existe ❌")
        }
    } catch (error) {
        return (
            res.status(404).json({message: "error en el buscado - catch", error: error.message})
        );
    }
};

//! --------------- GET by ID ----------------
const getById = async (req, res, next) => {
    // console.log("entro")
    try {
        const {id} = req.params;
        const teamById = await Team.findById(id); //? cogemos el elemento (equipo) identificandola a través del id, que es único
        return res
            .status(teamById ? 200 : 404)
            .json(teamById ? teamById : "no se ha encontrado un equipo con ese id ❌");

    } catch (error) {
        return res.status(404).json({message: "error en el GET by ID ❌ - catch general", error: error.message})
    }
};

//! --------------- GET ALL ----------------
const getAll = async (req, res, next) =>  {
    try {
        const allTeams = await Team.find() //? ------------- el find() nos devuelve un array con todos los elementos de la colección del BackEnd, es decir, TODOS LOS EQUIPOS
        return res 
            .status(allTeams.length > 0 ? 200 : 404) //? ---- si hay equipos en la db (el array tiene al menos 1 elemento), 200 o 404
            .json(allTeams.length > 0 ? allTeams : {message: "No se han encontrado equipos en la DB ❌", error: error.message}); 

    } catch (error) {
        return res.status(404).json({message: "error al buscar equipos en la colección ❌ - catch general", error: error.message});
    }
};

//! --------------- GET by NAME ----------------
const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const teamByName = await Team.find({name});
        return res
            .status(teamByName.length > 0 ? 200 : 404) //? igual que en get all, miramos si el array con ese nombre es mayor que 0 (solo debería de haber 1) y mostramos 200 o 404
            .json(teamByName.length > 0 ? teamByName : "no se ha encontrado un equipo con ese nombre ❌");

    } catch (error) {
        return res.status(404).json({message: "error al buscar a través del name ❌ - catch general", error: error.message});
    }
};

//! --------------- UPDATE ----------------
const update = async (req, res, next) => {
    await Team.syncIndexes(); //? .------------------- busca las actualizaciones, por si se ha modficado el modelo player
    let catchImg = req.file?.path; //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
    try {
        const {id} = req.params; //? ------------------- en esta linea y la siguiente hacemos lo mismo que en getById
        const teamById = await Team.findById(id);
        if (teamById) {
            const oldImg = teamById.image //? ------------- guardamos la imagen que había antes en el elemento
            
            const customBody = {
                _id: teamById._id, //? ---------- ponemos _.id porque así lo pone en insomnia
                image: req.file?.path ? catchImg : oldImg, //? -------------- si en el param hay una nueva imagen la ponemos en el lugar de la que había, si no hay una nueva, se deja la que había
                name: req.body?.name ? req.body.name : teamById.name,
                ranking: req.body?.ranking ? req.body.ranking : teamById.ranking,
                points: req.body?.points ? req.body.points : teamById.points,
                overalltrophies: req.body?.overalltrophies ? req.body.overalltrophies : teamById.overalltrophies,
                seasontrophies: req.body?.seasontrophies ? req.body.seasontrophies : teamById.seasontrophies,
                networth: req.body?.networth ? req.body.networth : teamById.networth,
                stadium: req.body?.stadium ? req.body.stadium : teamById.stadium,
            };

            //todo ---------------- ENUM (LEAGUE) -------------------
            if (req.body?.league) { //? si le mandamos la liga:
                const resultEnum = enumLeagueOk(req.body?.league); //? checkea si el valor introducido coincide con el enum (enumOk en utils) y devuelve check: true/false
                customBody.league = resultEnum.check 
                    ? req.body.league //? ----------------------------- si check es true, coge el valor ya que es válido
                    : teamById.league //? ---------------------------- si check es false, se queda con lo que tenía ya que el valor introducido no es el correcto del enum
            }
        
            try {
                await Team.findByIdAndUpdate(id, customBody); //? cambiamos el body con lo que hemos puesto en customBody en el elemento que encontremos con el id
                if (req.file?.path) {
                    deleteImgCloudinary(oldImg); //? -------------- eliminamos la imagen que había antes en la DB para no almacenar basura
                }
    //!           -------------------
    //!           | RUNTIME TESTING |
    //!           -------------------

                const teamByIdUpdated = await Team.findById(id) //? -------- buscamos el elemento actualizado a través del id
                const elementUpdate = Object.keys(req.body); //? ----------- buscamos los elementos de la request para saber qué se tiene que actualizar
                let test = []; //? ----------------------------------------- objeto vacío donde meter los tests. estará compuesta de las claves de los elementos y los valores seran true/false segun haya ido bien o mal

                elementUpdate.forEach((key) => { //? ----------------------------- recorremos las claves de lo que se quiere actualizar
                    if (req.body[key] === teamByIdUpdated[key]) { //? ------------ si el valor de la clave en la request (el valor actualizado que hemos pedido meter) es el mismo que el que hay ahora en el elemento ---> está bien
                        test[key] = true; //? ------------------------------------ está bien hecho por lo tanto en el test con la clave comprobada ponemos true --> test aprobado hehe
                    } else {
                        test[key] = false; //? ----------------------------------- algo ha fallado y por lo tanto el test está suspendido (false)
                    }
                });

                if (catchImg) {
                    teamByIdUpdated.image = catchImg //? ---------------- si la imagen en la request es la misma que la que hay ahora en el elemento
                        ? (test = { ...test, file: true}) //? ------------- hacemos una copia de test y le decimos que en file (foto) es true, ha ido bien
                        : (test = { ...test, file: false}) //? ------------ hacemos una copia de test y le decimos que en file (foto) es false, ha ido mal
                }

                let acc = 0
                for (clave in test) { //? -------------------- recorremos tests
                    test[clave] == false ? acc++ : null; //? - si el valor es false es que algo ha fallado y le sumamos al contador de fallos
                }
                
                if (acc > 0) { //? --------------------- si acc 1 o más, es que ha habido uno o más errores, y por lo tanto hay que notificarlo
                    return res.status(404).json({
                        dataTest: test, //? ------------ por aquí podremos examinar los errores viendo en qué claves se han producido
                        update: false
                    });
                } else {
                    return res.status(404).json({
                        dataTest: test,
                        update: true
                    })
                }
            } catch (error) {
                return res.status(404).json({message: "no se ha guardado el equipo updated correctamente ❌", error: error.message})
            }
        } else {
            return res.status(404).json("este equipo no existe ❌")
        }
    } catch (error) {
        return res.status(404).json({message: "error al actualizar datos del equipo (update) ❌ - catch general", error: error.message});
    }
};

//! --------------- DELETE ----------------
const deleteTeam = async (req, res, next) => {
    try {
        const {id} = req.params;
        const team = await Team.findByIdAndDelete(id); //? buscamos el equipo y lo eliminamos

        if (team) { //? si el equipo que queremos eliminar existe (tiene que hacerlo para poder eliminarlo)

            try { //? ----------------------------------------- ELIMINAMOS AL EQUIPO, DEL JUGADOR
                const test = await Player.updateMany( //? ----- ahora estamos cambiando en el model de Player para poder quitar el equipo que ya no existe
                    {team: id}, //? --------------------------- queremos cambiar lo que sea que haya que cambiar en esta propiedad del model, si se omite se dice que se cambia cualquier conincidencia en todo el modelo. es la condición
                    {$pull: {team: id}} //? ------------------- estamos diciendo que quite de la propiedad team, el id indicado, es decir el del equipo que se ha eliminado. es la ejecución
                )
            } catch (error) {
                return res.status(404).json({message: "Error al eliminar el equipo del jugador ❌", error: error.message})
            }

            // try { //? -------------------------------------- ELIMINAMOS AL EQUIPO DEL USER
            //     const test = await User.updateMany( //? ---- ahora estamos cambiando en el model de User para poder quitar el equipo que ya no existe
            //         {favTeams: id}, //? -------------------- condición/ubicación del cambio (eliminación)
            //         {$pull: {favTeams: id}} //? ------------ ejecución
            //     )
            // } catch (error) {
            //     return res.status(404).json({message: "Error al eliminar el equipo del usuario ❌", error: error.message})
            // }

            const findByIdTeam = await Team.findById(id); //? hemos encontrado este equipo? no debería existir porque lo hemos eliminado al ppio
            return res.status(findByIdTeam ? 404 : 200).json({ //? si se encuentra hay un error, porque no se ha eliminado
                deleteTest: findByIdTeam ? false : true, //? si existe, el test ha dado fallo y si no existe ha aprobado el test
            });
        } else {
            return res.status(404).json("este equipo no existe ❌"); //? si no existe el jugador antes de eliminarlo hay que dar error porque el jugador seleccionado para borrar no existia en un primer momento
        }
    } catch (error) {
        return res.status(404).json({message: "Error al eliminar el equipo ❌ - catch general", error: error.message});
    }
};


// todo -----------------------------------------------------
// todo -------------- EXTRA CONTROLLERS --------------------
// todo -----------------------------------------------------


//! --------------- SORT by POINTS and SHOW SELECTED INFO ----------------
const sortTeamsbyPoints = async (req, res, next) => {
    try {
        const teamsArray = await Team.find()
        teamsArray.sort((a, b) => {
            return b.points - a.points //? le decimos que ordene de manera descendiente (ascendiente sería a - b)
        })
        const arrayResumido = teamsArray.map((team) => ({ //? que nos muestre solo esta información para no tener ese montón de datos, solo lo relevante
            name: team.name,
            points: team.points,
            league: team.league
        }))
        return res
        .status(arrayResumido.length > 0 ? 200 : 404)
        .json(arrayResumido.length > 0 ? arrayResumido : "No se han encontrado equipos en la DB/BackEnd ❌")
    } catch (error) {
        return next(setError(500, error.message || "Error general al ordenar Equipos por Puntos ❌"))
    }
}

//! --------------- SORT by NET WORTH ----------------
const sortTeamsbyNetWorth = async (req, res, next) => {
    try {
        const teamsArray = await Team.find()
        teamsArray.sort((a, b) => {
            return b.networth - a.networth
        })
        const arrayResumido = teamsArray.map((team) => ({
            name: team.name,
            networth: team.networth,
            league: team.league
        }))
        return res
        .status(arrayResumido.length > 0 ? 200 : 404)
        .json(arrayResumido.length > 0 ? arrayResumido : "No se han encontrado equipos en la DB/BackEnd ❌")
    } catch (error) {
        return next(setError(500, error.message || "Error general al ordenar Equipos por Valor ❌"))
    }
}







module.exports = {
    create,
    togglePlayer,
    getById,
    getAll,
    getByName,
    update,
    deleteTeam,
    sortTeamsbyPoints,
    sortTeamsbyNetWorth,
}