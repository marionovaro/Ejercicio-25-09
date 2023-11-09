const { isAuth } = require("../../middleware/auth.middleware")
const { upload } = require("../../middleware/files.middleware"); //? lo traemos porque hay una subida de ficheros
const {
        //! MAIN
        registerLargo,
        registerEstado,
        registerWithRedirect,
        sendCode,
        getById,
        getAll,
        getByName,
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

        //! EXTRA
        addFavTeam,
        addFavPlayer,
        addFavEleven,
        addFavComment,
        addFollow,
        getFavTeams,
        getFavPlayers

} = require("../controllers/User.controller");

const UserRoutes = require("express").Router()

UserRoutes.post("/register",upload.single("image"), registerLargo);
UserRoutes.post("/registerUtil", upload.single("image"), registerEstado);
UserRoutes.post("/registerRedirect", upload.single("image"), registerWithRedirect);
UserRoutes.get("/:id", getById);
UserRoutes.get("/", getAll); 
UserRoutes.get("/byName/:name", getByName);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autologin);
UserRoutes.post("/check", checkNewUser);
UserRoutes.patch("/forgotpassword/forgotpassword", changePassword);


//! ----> Controladores autenticados
UserRoutes.get("/pruebas", [isAuth], exampleAuth);
UserRoutes.patch("/changepassword", [isAuth], modifyPassword)
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update)
UserRoutes.delete("/", [isAuth], deleteUser)
//todo ------- EXTRA
UserRoutes.patch("/toggleTeam/:idTeam", [isAuth], addFavTeam)
UserRoutes.patch("/togglePlayer/:idPlayer", [isAuth], addFavPlayer)
UserRoutes.patch("/toggleEleven/:idEleven", [isAuth], addFavEleven)
UserRoutes.patch("/toggleComment/:idComment", [isAuth], addFavComment)
UserRoutes.patch("/toggleFollow/:idUser", [isAuth], addFollow)
UserRoutes.get("/favTeams/:id", [isAuth], getFavTeams)
UserRoutes.get("/favPlayers/:id", [isAuth], getFavPlayers)

//!-----> Controladores de redirect
UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch("/sendPassword/:id", sendPassword);


module.exports = UserRoutes;