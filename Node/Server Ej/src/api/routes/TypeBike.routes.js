const { 
    createTypeBike,
    toggleBike
} = require("../controllers/TypeBike.controllers");

const TypeBikeRoutes = require("express").Router();

TypeBikeRoutes.post("/", createTypeBike);
TypeBikeRoutes.patch("/add/:id", toggleBike);

module.exports = TypeBikeRoutes;