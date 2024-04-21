import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { MagicCardCollection } from '../modificacion/CardCollection.js';
import { MagicCard, MagicColor, MagicType, MagicRarity } from '../modificacion/Card.js';

/**
 * Configura y ejecuta los comandos del cliente.
 * Utiliza `yargs` para definir comandos que permiten interactuar con las colecciones de cartas.
 */
const setupCommands = () => {
    yargs(hideBin(process.argv))
        .command({
            command: 'add',
            describe: 'Añade una nueva carta a la colección',
            builder: {
                id: { type: 'number', demandOption: true },
                name: { type: 'string', demandOption: true },
                manaCost: { type: 'number', demandOption: true },
                color: { type: 'string', choices: Object.values(MagicColor), demandOption: true },
                type: { type: 'string', choices: Object.values(MagicType), demandOption: true },
                rarity: { type: 'string', choices: Object.values(MagicRarity), demandOption: true },
                text: { type: 'string', demandOption: true },
                marketValue: { type: 'number', demandOption: true },
                userName: { type: 'string', demandOption: true }
            },
            /**
             * Manejador para el comando 'add'. Crea y añade una nueva carta a la colección de un usuario.
             * @param argv Argumentos recibidos desde la línea de comandos.
             */
            handler(argv) {
                const collection = new MagicCardCollection(argv.userName);
                const newCard = new MagicCard(
                    argv.id,
                    argv.name,
                    argv.manaCost,
                    argv.color,
                    argv.type,
                    argv.rarity,
                    argv.text,
                    argv.marketValue
                );
                 // console.log(collection.addCard(newCard));
                collection.addCard(newCard)
                    .then((result) => console.log(result))
                    .catch((error) => console.log(error));
            }
        })
       
        .command({
            command: 'list',
            describe: 'Lista todas las cartas en la colección',
            builder: {
                userName: { type: 'string', demandOption: true }
            },
            /**
             * Manejador para el comando 'list'. Lista todas las cartas en la colección de un usuario.
             * @param argv Argumentos recibidos desde la línea de comandos.
             */
            handler(argv) {
                const collection = new MagicCardCollection(argv.userName);
                console.log(collection.listCards());
            }
        })
        .command({
            command: 'update',
            describe: 'Actualiza una carta en la colección',
            builder: {
                id: { type: 'number', demandOption: true },
                name: { type: 'string', demandOption: true },
                manaCost: { type: 'number', demandOption: true },
                color: { type: 'string', choices: Object.values(MagicColor), demandOption: true },
                type: { type: 'string', choices: Object.values(MagicType), demandOption: true },
                rarity: { type: 'string', choices: Object.values(MagicRarity), demandOption: true },
                text: { type: 'string', demandOption: true },
                marketValue: { type: 'number', demandOption: true },
                userName: { type: 'string', demandOption: true }
            },
            /**
             * Manejador para el comando 'update'. Actualiza una carta específica en la colección de un usuario.
             * @param argv Argumentos recibidos desde la línea de comandos.
             */
            handler(argv) {
                const collection = new MagicCardCollection(argv.userName);
                const updatedCard = new MagicCard(
                    argv.id,
                    argv.name,
                    argv.manaCost,
                    argv.color,
                    argv.type,
                    argv.rarity,
                    argv.text,
                    argv.marketValue
                );
                console.log(collection.updateCard(updatedCard));
            }
        })
        .command({
            command: 'read',
            describe: 'Lee los detalles de una carta específica',
            builder: {
                id: { type: 'number', demandOption: true },
                userName: { type: 'string', demandOption: true }
            },
            /**
             * Manejador para el comando 'read'. Muestra los detalles de una carta específica de la colección de un usuario.
             * @param argv Argumentos recibidos desde la línea de comandos.
             */
            handler(argv) {
                const collection = new MagicCardCollection(argv.userName);
                console.log(collection.readCard(argv.id));
            }
        })
        .command({
            command: 'remove',
            describe: 'Elimina una carta de la colección',
            builder: {
                id: { type: 'number', demandOption: true },
                userName: { type: 'string', demandOption: true }
            },
            /**
             * Manejador para el comando 'remove'. Elimina una carta específica de la colección de un usuario.
             * @param argv Argumentos recibidos desde la línea de comandos.
             */
            handler(argv) {
                const collection = new MagicCardCollection(argv.userName);
                // console.log(collection.deleteCard(argv.id));
                collection.deleteCard(argv.id)
                .then((result) => console.log(result))
                .catch((error) => console.log(error));
            }
        })
        .help()
        .parse();
};

setupCommands();