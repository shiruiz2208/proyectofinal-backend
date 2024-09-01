import Habitacion from '../models/Habitacion.js';

const obtenerHabitaciones = async (req, res) => {
    const habitaciones = await Habitacion.find().where('creador').equals(req.usuario);
    res.json(habitaciones);
};

const crearHabitaciones = async (req, res) => {
    const habitacion = new Habitacion(req.body);
    habitacion.creador = req.usuario._id;

    try {
        const habitacionAlmacenada = await proyecto.save();
        res.json(habitacionAlmacenada);
    } catch (error) {
        console.log(error)
    }
};

const obtenerHabitacion = async (req, res) => {
    const { id } =  req.params;

    const habitacion = await Habitacion.findById(id);
    
    if(!habitacion) {
        const error =  new Error('No Encontrado');
        return res.status(404).json({ msg: error.message })
    }

    if(habitacion.creador.toString() !== req.usuario._id.toString()) {
        const error =  new Error('Acción no Válida');
        return res.status(401).json({ msg: error.message })
    }
    res.json(habitacion);
};

const editarHabitacion = async (req, res) => {
    const { id } =  req.params;

    const habitacion = await Habitacion.findById(id);
    
    if(!habitacion) {
        const error =  new Error('No Encontrado');
        return res.status(404).json({ msg: error.message })
    }

    if(habitacion.creador.toString() !== req.usuario._id.toString()) {
        const error =  new Error('Acción no Válida');
        return res.status(401).json({ msg: error.message })
    }

    habitacion.nombre = req.body.nombre || habitacion.nombre;
    habitacion.descripcion = req.body.descripcion || habitacion.descripcion;
    habitacion.fechaEntrega = req.body.fechaEntrega || habitacion.fechaEntrega;
    habitacion.cliente = req.body.cliente || habitacion.cliente;

    try {
        const habitacionAlmacenada = await habitacion.save();
        res.json(habitacionAlmacenada)
    } catch (error) {
        console.log(error)
    }
};

const eliminarHabitacion = async (req, res) => {
    const { id } =  req.params;

    const habitacion = await Habitacion.findById(id);
    
    if(!habitacion) {
        const error =  new Error('No Encontrado');
        return res.status(404).json({ msg: error.message })
    }

    if(habitacion.creador.toString() !== req.usuario._id.toString()) {
        const error =  new Error('Acción no Válida');
        return res.status(401).json({ msg: error.message })
    }

    try {
        await habitacion.deleteOne();
        res.json({ msg: 'Habitacion Eliminada'});
    } catch (error) {
        console.log(error)
    }
};

export {
  obtenerHabitaciones,
  crearHabitaciones,
  obtenerHabitacion,
  editarHabitacion,
  eliminarHabitacion,
};
