const { upload } = require("../../middleware/files.middleware");
const { 
    create,
    getById,
    getAll,
    getByName,
    update,
    deleteTeam
} = require("../controllers/Team.controller");

const TeamRoutes = require("express").Router();

TeamRoutes.post("/",upload.single("image"), create); 
TeamRoutes.get("/:id", getById);
TeamRoutes.get("/", getAll);
TeamRoutes.get("/byName/:name", getByName);
TeamRoutes.patch("/:id", upload.single("image"), update);
TeamRoutes.delete("/:id", deleteTeam);

module.exports = TeamRoutes
