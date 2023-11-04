const { upload } = require("../../middleware/files.middleware");
const { 
    create,
    togglePlayer,
    getById,
    getAll,
    getByName,
    update,
    deleteTeam,
    sortTeamsbyPoints,
    sortTeamsbyNetWorth
} = require("../controllers/Team.controller");

const TeamRoutes = require("express").Router();

TeamRoutes.post("/",upload.single("image"), create);
TeamRoutes.patch("/add/:id", togglePlayer);
TeamRoutes.get("/:id", getById);
TeamRoutes.get("/", getAll);
TeamRoutes.get("/byName/:name", getByName);
TeamRoutes.patch("/:id", upload.single("image"), update);
TeamRoutes.delete("/:id", deleteTeam);

TeamRoutes.get("/sortbypoints/teams", sortTeamsbyPoints)
TeamRoutes.get("/sortbynetworth/teams", sortTeamsbyNetWorth)

module.exports = TeamRoutes
