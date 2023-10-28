const { upload } = require("../../middleware/files.middleware"); //? lo traemos porque hay una subida de ficheros
const {registerLargo} = require("../controllers/User.controller");

const UserRoutes = require("express").Router()

UserRoutes.post("/register",upload.single("image"), registerLargo);

module.exports = UserRoutes;