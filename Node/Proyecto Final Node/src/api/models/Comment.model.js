const mongoose = require("mongoose");
const Schema = mongoose.Schema
const CommentSchema = new Schema(
    {
        creator: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        location: [{type: mongoose.Schema.Types.ObjectId, ref: "Eleven"}],
        content: {type: String, unique: false, required: true},
    },
    {
        timestamps: true
    }
);
const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment; // para comentario