import express from 'express';
import cardRoutes from '../practica9/CardRoute.js';

/**
 * Aplicación Express para gestionar las solicitudes relacionadas con las cartas Magic.
 */
const app = express();

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Rutas de la API para las operaciones sobre las cartas
app.use('/api', cardRoutes);

// Puerto en el que el servidor Express escucha las solicitudes entrantes
const PORT = 3000;

// Iniciar el servidor Express y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
