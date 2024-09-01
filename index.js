import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

const app = express();

dotenv.config();

conectarDB();

// Configurar CORS (Lista blanca de dominios permitidos)
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            // Puede consultar la API
            callback(null, true);
        } else {
            // No esta permitido
            callback(new Error('Error de Cors'));
        }
    }
};
app.use(cors(corsOptions));

// Rutas
import authRoutes from './routes/authRoutes.js';
import habitacionRoutes from './routes/habitacionRoutes.js';

const PORT = process.env.PORT || 4005;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/habitaciones', habitacionRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});