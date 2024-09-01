import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    roles: {
        type: String,
        enum: ['superadmin', 'user'],
        default: 'user'
        // required: true
    },
    habitaciones: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habitacion'
    }
}, {
    timestamps: true,
    versionKey: false
});

UsuarioSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Puedo crear metodos. El metodo estara disponible en el modelo Usuario
UsuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;