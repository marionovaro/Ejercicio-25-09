const mongoose = require("mongoose");

const TypeBikeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        use: {type: String, required: false, unique: false},
        bikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Bike"}],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}] //? estamos añadiendo una relación con el modelo Users con la que se podrá dar like a los tipos de moto
    },
    {
        timestamps: true,
    }
);

const TypeBike = mongoose.model("TypeBike", TypeBikeSchema);

module.exports = TypeBike;