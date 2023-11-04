const { isAuth } = require("../../middleware/auth.middleware")
const { upload } = require("../../middleware/files.middleware"); //? lo traemos porque hay una subida de ficheros
const {registerLargo,
        registerEstado,
        registerWithRedirect,
        sendCode,
        login,
        autologin,
        resendCode,
        checkNewUser,
        changePassword,
        sendPassword,
        exampleAuth,
        modifyPassword,
        update,
        deleteUser,
        addFavTeam
} = require("../controllers/User.controller");

const UserRoutes = require("express").Router()

UserRoutes.post("/register",upload.single("image"), registerLargo);
UserRoutes.post("/registerUtil", upload.single("image"), registerEstado);
UserRoutes.post("/registerRedirect", upload.single("image"), registerWithRedirect);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autologin);
UserRoutes.post("/check", checkNewUser);
UserRoutes.patch("/forgotpassword/forgotpassword", changePassword);


//! ----> Controladores autenticados
UserRoutes.get("/pruebas", [isAuth], exampleAuth);
UserRoutes.patch("/changepassword", [isAuth], modifyPassword)
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update)
UserRoutes.delete("/", [isAuth], deleteUser)
UserRoutes.patch("/toggleTypeBike/:idTypeBike", addFavTeam)

//!-----> Controladores de redirect
UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch("/sendPassword/:id", sendPassword);


module.exports = UserRoutes;