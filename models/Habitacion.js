import mongoose from 'mongoose';

const HabitacionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        enum: ['standart', 'premium'],
        required: true,
    },
    disponibilidades: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    },
    imagen: {
        type: String,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
}, {
    timestamps: true,
    versionKey: false
});

const Habitacion = mongoose.model('Habitacion', HabitacionSchema);
export default Habitacion;