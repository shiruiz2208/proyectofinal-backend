import express from "express";
const router = express.Router();

import {
  obtenerHabitaciones,
  crearHabitaciones,
  obtenerHabitacion,
  editarHabitacion,
  eliminarHabitacion,
} from "../controllers/habitacionController.js";
import checkAuth from "../middleware/checkAuth.js";

// Rutas - Habitaciones
router.route("/")
  .get(checkAuth, obtenerHabitaciones)
  .post(checkAuth, crearHabitaciones);

router.route("/:id")
  .get(checkAuth, obtenerHabitacion)
  .put(checkAuth, editarHabitacion)
  .delete(checkAuth, eliminarHabitacion);

export default router;
