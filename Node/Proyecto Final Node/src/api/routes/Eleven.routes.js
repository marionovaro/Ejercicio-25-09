const { isAuth } = require("../../middleware/auth.middleware");
const {
  create,
  getById,
  getAll,
  getByName,
  update,
  deleteEleven,
} = require("../controllers/Eleven.controller");

const ElevenRoutes = require("express").Router();

ElevenRoutes.post("/create", [isAuth], create);
ElevenRoutes.get("/:id", getById);
ElevenRoutes.get("/", getAll);
ElevenRoutes.get("/byname/:name", getByName);
ElevenRoutes.patch("/:id", update);
ElevenRoutes.delete("/delete/:id", deleteEleven);

module.exports = ElevenRoutes;
