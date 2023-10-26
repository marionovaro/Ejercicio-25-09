const mongoose = require("mongoose");

const TypeBikeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        use: {type: String, required: false, unique: false},
        bikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Bike"}]
    },
    {
        timestamps: true,
    }
);

const TypeBike = mongoose.model("TypeBike", TypeBikeSchema);

module.exports = TypeBike;