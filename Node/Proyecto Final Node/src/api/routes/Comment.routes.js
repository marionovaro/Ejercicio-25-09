const { isAuth } = require("../../middleware/auth.middleware");
const {
    create,
    getById,
    getAll,
    getByName,
    update,
    deleteEleven,
} = require("../controllers/Comment.controller");

const CommentRoutes = require("express").Router();

// CommentRoutes.post("/create", [isAuth], create);
// CommentRoutes.get("/:id", getById);
// CommentRoutes.get("/", getAll);
// CommentRoutes.get("/byname/:name", getByName);
// CommentRoutes.patch("/:id", update);
// CommentRoutes.delete("/delete/:id", deleteEleven);

module.exports = CommentRoutes