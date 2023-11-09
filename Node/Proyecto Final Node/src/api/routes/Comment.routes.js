const { isAuth } = require("../../middleware/auth.middleware");
const {
    create,
    getById,
    getAll,
    getByName,
    update,
    deleteComment,
} = require("../controllers/Comment.controller");

const CommentRoutes = require("express").Router();

CommentRoutes.post("/create/:location", [isAuth], create);
CommentRoutes.get("/getbyid/:id", getById);
CommentRoutes.get("/getall/:location", getAll);
// CommentRoutes.get("/byname/:name", getByName);
// CommentRoutes.patch("/:id", update);
CommentRoutes.delete("/delete/:id", deleteComment);

module.exports = CommentRoutes