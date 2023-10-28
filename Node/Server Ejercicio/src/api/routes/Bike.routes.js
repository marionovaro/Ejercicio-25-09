const { upload } = require("../../middleware/files.middleware");
const { 
    create,
    getById, 
    getAll,
    getByModel,
    update,
    deleteBike
} = require("../controllers/Bike.controllers");

const BikeRoutes = require("express").Router();

BikeRoutes.post("/",upload.single("image"), create); //? en medio de la ruta y la función que crea (controlador) está la MIDDLEware, por eso ponemos upload.single, qu ees un método para subir una imagen en concreto.
BikeRoutes.get("/:id", getById);
BikeRoutes.get("/", getAll);
BikeRoutes.get("/byModel/:model", getByModel);
BikeRoutes.patch("/:id", upload.single("image"), update);
BikeRoutes.delete("/:id", deleteBike);

module.exports = BikeRoutes
