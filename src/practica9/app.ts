import express from 'express';
import cardRoutes from '../practica9/CardRoute.js';

/**
 * Aplicación Express para gestionar las solicitudes relacionadas con las cartas Magic.
 */

const app = express();

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
//se utiliza para analizar el cuerpo de las solicitudes entrantes con formato JSON.
//le dices a express que analice el cuerpo de las solicitudes de formato json y 
//lo hace accesible en el req.body, para que trabaje con esos datos en sus manejadores de rutas
app.use(express.json());

// Rutas de la API para las operaciones sobre las cartas
//aqui el enrutador se monta en la aplicacion EXpress usando api/ como prefijio de laa ruta
///seria todo api/cards y cardroutes es el enrutador que quiero montar
//resumen todas la solicitudes que empiecen por api seran manejadas por cardroutes
app.use('/api', cardRoutes);

// Puerto en el que el servidor Express escucha las solicitudes entrantes
const PORT = 3000;

// Iniciar el servidor Express y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
