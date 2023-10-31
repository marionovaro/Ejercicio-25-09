const { upload } = require("../../middleware/files.middleware"); //? lo traemos porque hay una subida de ficheros
const {registerLargo, registerEstado, registerWithRedirect, sendCode, login, autologin} = require("../controllers/User.controller");

const UserRoutes = require("express").Router()

UserRoutes.post("/register",upload.single("image"), registerLargo);
UserRoutes.post("/registerUtil", upload.single("image"), registerEstado);
UserRoutes.post("/registerRedirect", upload.single("image"), registerWithRedirect)
UserRoutes.post("/login", login)
UserRoutes.post("/login/autologin", autologin)
UserRoutes.post("/check", checkNewUser)

//!-----> 
UserRoutes.post("/register/sendMail/:id", sendCode)


module.exports = UserRoutes;