import express from "express";
const router = express.Router();

import { 
    registrarse, 
    login, 
    perfil 
} from '../controllers/authController.js';
import checkAuth from "../middleware/checkAuth.js";

// Rutas - Auth
router.post('/register', registrarse);
router.post('/login', login);
router.get('/profile', checkAuth, perfil);

export default router;