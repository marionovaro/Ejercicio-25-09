const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const enumOk = require("../../utils/enumOk");
const Player = require("../models/Player.model");
const Team = require("../models/Team.model");

//! --------------- CREATE ----------------
const create = async (req, res, next) => {
    let catchImg = req.file?.path //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
    try {
        await Player.syncIndexes() //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
        const newPlayer = new Player(req.body) //? --------------------- instanciamos un nuevo jugador y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
        if (req.file) { //? -------------------- miramos si en la request hay imagen. Si la hay, la introducimos al nuevo jugador
            newPlayer.image = catchImg;
        } else {
            newPlayer.image = "https://s.hs-data.com/bilder/spieler/gross/619081.jpg?fallback=png"
        }

        const savePlayer = await newBike.save(); //? ---------------------- GUARDAMOS EL JUGADOR EN LA BASE DE DATOS (DB) O BACKEND
        //todo ----------------- INTENTO RECIPROCIDAD EN EL CREATE ---------------- 
        // const id = savePlayer._id //? obtenemos el id a través de _id (FORMA PARA OBTENER EL ID)
        // const typebikeofBike = req.body?.type
        // if (typebikeofBike) {
        //     const updateTypes = await TypeBike.findByIdAndUpdate(typebikeofBike,
        //         {bikes: id}
        //     )
        // } //todo ------------------------------------------------------------------
        
        if (savePlayer) { //? si se ha guardado correctamente (savePlayer existe)
                res.status(200).json(savePlayer);
            } else {
                return res.status(404).json({message: "No se ha podido guardar el jugador en la DB ❌", error: error.message})
            }
        
    } catch (error) { //? ------------------------ si ha habido un error subiendo la imagen, hay que borrarla, ya que ya se ha subido a cloudinary. Se ha hecho en la primera línea de esta función
        req.file?.path ? deleteImgCloudinary(catchImg) : null;
        return res.status(404).json({
            message: "error en el creado del jugador ❌ - catch general",
            error: error.message
        }) && next(error)
    }
};

//! --------------- GET by ID ----------------
const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const playerById = await Player.findById(id); //? cogemos el elemento (jugador) identificandola a través del id, que es único
        if (playerById) { //? --------------------------- si hay un elemento con dicho id
            return res.status(200).json(playerById);
        } else {
            return res.status(404).json("no se ha encontrado el jugador ❌") 
        }
    } catch (error) {
        return res.status(404).json({message: "error en el GET by ID ❌ - catch general", error: error.message})
    }
};

//! --------------- GET ALL ----------------
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