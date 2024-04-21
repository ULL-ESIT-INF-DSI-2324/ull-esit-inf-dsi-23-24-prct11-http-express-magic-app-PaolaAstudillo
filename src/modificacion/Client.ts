import net from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Interface que representa una carta dentro del juego.
 * @interface
 * @property {number} id - Identificador único de la carta.
 * @property {string} name - Nombre de la carta.
 * @property {number} manaCost - Coste de maná para lanzar la carta.
 * @property {string} color - Color de la carta, utilizado en el juego para estrategias.
 * @property {string} type - Tipo de carta (ej: Criatura, Conjuro).
 * @property {string} rarity - Rareza de la carta.
 * @property {string} text - Texto que describe las habilidades de la carta.
 * @property {number} marketValue - Valor de mercado de la carta.
 */
interface Card {
    id: number;
    name: string;
    manaCost: number;
    color: string;
    type: string;
    rarity: string;
    text: string;
    marketValue: number;
}

/**
 * Envía un comando al servidor mediante un socket.
 * @param {string} command - Comando a ejecutar.
 * @param {Card | unknown} cardData - Datos de la carta o parámetro adicional necesario para el comando.
 * @param {string} userName - Nombre del usuario que realiza la acción.
 */
function sendCommand(command: string, cardData: Card | unknown, userName: string) {
    const client = new net.Socket();
    const requestData = JSON.stringify({
        action: command,
        card: cardData,
        userName: userName
    });

    client.connect(2424, 'localhost', () => {
        console.log('Conectado al servidor.');
        client.write(requestData + '\n');
    });

    client.on('data', (data) => {
        console.log('Respuesta del servidor:', data.toString());
        client.destroy(); // Termina el cliente después de la respuesta del servidor
    });

    client.on('close', () => {
        console.log('Conexión cerrada');
    });
}

// Configuración de los comandos disponibles en la interfaz de línea de comandos.
yargs(hideBin(process.argv))
    .command('add <user> <id> <name> <manaCost> <color> <type> <rarity> <text> <marketValue>', 'Añade una nueva carta', (yargs) => {
        return yargs.positional('user', {
            describe: 'Nombre del usuario',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true },
            name: { type: 'string', demandOption: true },
            manaCost: { type: 'number', demandOption: true },
            color: { type: 'string', demandOption: true },
            type: { type: 'string', demandOption: true },
            rarity: { type: 'string', demandOption: true },
            text: { type: 'string', demandOption: true },
            marketValue: { type: 'number', demandOption: true },
        });
    }, (argv) => {
        const card: Card = {
            id: argv.id,
            name: argv.name,
            manaCost: argv.manaCost,
            color: argv.color,
            type: argv.type,
            rarity: argv.rarity,
            text: argv.text,
            marketValue: argv.marketValue
        };
        sendCommand('add', card, argv.user as string);
    })
    .command('update <user> <id> <name> <manaCost> <color> <type> <rarity> <text> <marketValue>', 'Actualiza una carta existente', (yargs) => {
        return yargs.positional('user', {
            describe: 'Nombre del usuario',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true },
            name: { type: 'string', demandOption: true },
            manaCost: { type: 'number', demandOption: true },
            color: { type: 'string', demandOption: true },
            type: { type: 'string', demandOption: true },
            rarity: { type: 'string', demandOption: true },
            text: { type: 'string', demandOption: true },
            marketValue: { type: 'number', demandOption: true },
        });
    }, (argv) => {
        const card: Card = {
            id: argv.id,
            name: argv.name,
            manaCost: argv.manaCost,
            color: argv.color,
            type: argv.type,
            rarity: argv.rarity,
            text: argv.text,
            marketValue: argv.marketValue
        };
        sendCommand('update', card, argv.user as string);
    })
    .command('delete <user> <id>', 'Elimina una carta', (yargs) => {
        return yargs.positional('user', {
            describe: 'Nombre del usuario',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true }
        });
    }, (argv) => {
        sendCommand('delete', { id: argv.id }, argv.user as string);
    })
    .command('list <user>', 'Lista todas las cartas de un usuario', (yargs) => {
        return yargs.positional('user', {
            describe: 'Nombre del usuario',
            type: 'string'
        });
    }, (argv) => {
        sendCommand('list', {}, argv.user as string);
    })
    .command('read <user> <id>', 'Muestra los detalles de una carta', (yargs) => {
        return yargs.positional('user', {
            describe: 'Nombre del usuario',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true }
        });
    }, (argv) => {
        sendCommand('read', { id: argv.id }, argv.user as string);
    })
    .help()
    .parse();