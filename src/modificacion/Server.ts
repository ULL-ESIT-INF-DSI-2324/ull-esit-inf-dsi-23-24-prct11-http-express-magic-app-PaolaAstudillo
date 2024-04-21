import net from 'net';
import { MagicCardCollection } from '../modificacion/CardCollection.js'; // Asegúrate de que esta ruta sea correcta y que MagicCardCollection esté correctamente exportado
import { MagicCard } from '../modificacion/Card.js'; // Asegúrate de que esta ruta sea correcta y que MagicCard esté correctamente exportado

/**
 * Interfaz para las solicitudes de tarjetas.
 */
interface CardRequest {
    action: string;
    card: MagicCard;
    userName: string;
}

/**
 * Crea un servidor TCP para manejar las solicitudes de tarjetas.
 */
const server = net.createServer((socket) => {
    socket.on('data', async (data) => {
        const request: CardRequest = JSON.parse(data.toString());
        const collection = new MagicCardCollection(request.userName);
        let response: string;

        try {
            switch (request.action) {
                case 'add':
                    collection.addCard(request.card)
                    .then(response => socket.end(response))
                    .catch(error => socket.end(`Error: ${error.message}`));
                break;
                case 'update':
                    response = await collection.updateCard(request.card);
                    break;
                case 'delete':
                    collection.deleteCard(request.card.id)
                    .then(response => socket.end(response)) //cierra sockect tras enviar respuesta
                    .catch(error => socket.end(`Error: ${error.message}`));
                    //
                break;
                case 'list':
                    response = await collection.listCards(); // Usando await aquí
                    break;
                case 'read':
                    response = await collection.readCard(request.card.id); // Usando await aquí
                    break;
                default:
                    response = 'Unknown command';
            }
        } catch (error) {
            response = `Error: ${error.message}`;
        }

        socket.write(response);
        socket.end();
    });
});
/**
 * Escucha las conexiones en el puerto 2424.
 */
server.listen(2424, () => {
    console.log('Server is listening on port 2424');
});