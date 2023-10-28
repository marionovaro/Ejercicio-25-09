const { 
    createTypeBike, 
    toggleBike,
    getById,
    getAll,
    getByName,
    update,
    deleteTypeBike
} = require("../controllers/TypeBike.controllers");

const TypeBikeRoutes = require("express").Router();

TypeBikeRoutes.post("/", createTypeBike);
TypeBikeRoutes.patch("/add/:id", toggleBike);
TypeBikeRoutes.get("/:id", getById);
TypeBikeRoutes.get("/", getAll);
TypeBikeRoutes.get("/byName/:name", getByName);
TypeBikeRoutes.patch("/:id", update);
TypeBikeRoutes.delete("/:id", deleteTypeBike);

module.exports = TypeBikeRoutes;