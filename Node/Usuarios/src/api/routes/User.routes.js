const { upload } = require("../../middleware/files.middleware"); //? lo traemos porque hay una subida de ficheros
const {registerLargo, registerEstado} = require("../controllers/User.controller");

const UserRoutes = require("express").Router()

UserRoutes.post("/register",upload.single("image"), registerLargo);
UserRoutes.post("/registerUtil", upload.single("image"), registerEstado);

module.exports = UserRoutes;