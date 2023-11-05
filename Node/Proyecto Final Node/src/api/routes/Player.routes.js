const { upload } = require("../../middleware/files.middleware");
const { 
    create,
    getById,
    getAll,
    getByName,
    update,
    deletePlayer,
    filter90Players
} = require("../controllers/Player.controller");

const PlayerRoutes = require("express").Router();

PlayerRoutes.post("/",upload.single("image"), create); //? en medio de la ruta y la función que crea (controlador) está la MIDDLEware, por eso ponemos upload.single, qu ees un método para subir una imagen en concreto.
PlayerRoutes.get("/:id", getById);
PlayerRoutes.get("/", getAll);
PlayerRoutes.get("/byName/:name", getByName);
PlayerRoutes.patch("/:id", upload.single("image"), update);
PlayerRoutes.delete("/:id", deletePlayer);

PlayerRoutes.get("/filter90rating/players", filter90Players)


module.exports = PlayerRoutes
