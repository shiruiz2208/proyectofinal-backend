import Usuario from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';

const registrarse = async (req, res) => {
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if(existeUsuario) {
        const error =  new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({ msg: 'Usuario registrado correctamente' });
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar que el usuario existe
    const usuario = await Usuario.findOne({ email });
    if(!usuario) {
        const error =  new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    // Comprobar su password
    if( await usuario.comprobarPassword(password)) {
         res.json({
             id: usuario._id,
             nombre: usuario.nombre,
             email: usuario.email,
             rol: usuario.roles,
             accessToken: generarJWT(usuario._id)
         });
    } else {
        const error =  new Error('El password es incorrecto');
        return res.status(403).json({ msg: error.message })
    }
};

const perfil = (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

export { 
    registrarse, 
    login, 
    perfil 
};