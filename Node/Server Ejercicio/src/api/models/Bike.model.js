const mongoose = require("mongoose")


const Schema = mongoose.Schema; //? ESQUEMAS DE DATOS

const BikesSchema = new Schema( //? DEFINICIÓN DE DATOS
    {
        mark: {type: String, required: true, unique: false},
        model: {type: String, required: true, unique: false},
        engine: {type: Number, required: false, unique: false},
        year: {type: Number, required: false, unique: false},
        image: {type: String, required: false, unique: false},
        cylinders: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: false
        },
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "TypeBike"}]
    },
    {
        timestamps: true, // momento en el que se ha creado este elemento (el de arriba)
    }
);

const Bike = mongoose.model("Bikes", BikesSchema) //? Creación del modelo de datos con los datos ya incrustados

module.exports = Bike; //? Exportación del modelo para que lo usen los controladores