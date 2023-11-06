const { upload } = require("../../middleware/files.middleware");
const { 
    //! MAIN
    create,
    togglePlayer,
    getById,
    getAll,
    getByName,
    update,
    deleteTeam,

    //! EXTRA
    sortTeamsbyLeagueandRanking,
    sortTeamsbyDescending,
    sortTeamsbyAscending,
    filterGeneralNum,

    //! DESCARTADOS
    sortTeamsbyPoints,
    sortTeamsbyNetWorth,
    add90players

} = require("../controllers/Team.controller");

const TeamRoutes = require("express").Router();

TeamRoutes.post("/",upload.single("image"), create);
TeamRoutes.patch("/add/:id", togglePlayer);
TeamRoutes.get("/:id", getById);
TeamRoutes.get("/", getAll);
TeamRoutes.get("/byName/:name", getByName);
TeamRoutes.patch("/:id", upload.single("image"), update);
TeamRoutes.delete("/:id", deleteTeam);


//! Controladores Extra
TeamRoutes.get("/sortranking/:league", sortTeamsbyLeagueandRanking)
TeamRoutes.get("/sortdescending/teams/:stat", sortTeamsbyDescending)
TeamRoutes.get("/sortascending/teams/:stat", sortTeamsbyAscending)
TeamRoutes.get("/filter/teams/:filter/:gt/:lt", filterGeneralNum)


//! Controladores Descartados
TeamRoutes.get("/sortbypoints/teams", sortTeamsbyPoints)
TeamRoutes.get("/sortbynetworth/teams", sortTeamsbyNetWorth)
TeamRoutes.patch("/players/:id/:players", add90players) //todo ---- REDIRECT

module.exports = TeamRoutes
