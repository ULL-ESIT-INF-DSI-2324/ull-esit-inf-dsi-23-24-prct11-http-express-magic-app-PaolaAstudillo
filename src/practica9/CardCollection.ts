import { MagicCard } from "../practica9/Card.js";
import * as fs from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Clase que representa una colección de cartas Magic para un usuario.
 */
export class MagicCardCollection {
    private cards = new Map<number, MagicCard>();
    private basePath: string;
    private __dirname: string;

    /**
     * Crea una instancia de MagicCardCollection.
     * @param username El nombre de usuario para la colección de cartas.
     */
    constructor(private username: string) {
        this.__dirname = dirname(fileURLToPath(import.meta.url));
        this.basePath = path.join(this.__dirname, '../../data', `${this.username}.json`);
        // Llamar a loadCollection y manejar los errores aquí es opcional, depende de cómo quieras diseñar el flujo de tu aplicación.
        this.loadCollection().catch(error => console.error(chalk.red('Error al cargar la colección al iniciar:', error)));
    }

    /**
     * Carga la colección de cartas desde el sistema de archivos.
     * @returns Una promesa que indica si la carga se realizó con éxito.
     */
    private async loadCollection(): Promise<void> {
        try {
            const rawData = await fs.readFile(this.basePath, 'utf8');
            const cardsData: MagicCard[] = JSON.parse(rawData);
            cardsData.forEach(card => this.cards.set(card.id, card));
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(chalk.yellow('No se encontró el archivo de colección, se inicializará una nueva colección.'));
                await fs.writeFile(this.basePath, JSON.stringify([]));
            } else {
                console.error(chalk.red('Error al cargar la colección:'), error);
                throw error;
            }
        }
    }

    /**
     * Escribe la colección de cartas en el sistema de archivos.
     * @returns Una promesa que indica si la escritura se realizó con éxito.
     */
    public async writeCollection(): Promise<void> {
        const cardData = Array.from(this.cards.values());
        await fs.writeFile(this.basePath, JSON.stringify(cardData, null, 2));
    }
    
    /**
     * Añade una carta a la colección.
     * @param card La carta a añadir.
     * @returns Una promesa que indica si la adición se realizó con éxito.
     * @throws Error si la carta ya existe en la colección.
     */
    public async addCard(card: MagicCard): Promise<void> {
        if (this.cards.has(card.id)) {
            throw new Error(`Error: La carta con ID ${card.id} ya existe.`);
        } else {
            this.cards.set(card.id, card);
        }
    }

    /**
     * Actualiza una carta en la colección.
     * @param card La carta actualizada.
     * @returns Una promesa que indica si la actualización se realizó con éxito.
     * @throws Error si la carta no se encuentra en la colección.
     */
    public async updateCard(card: MagicCard): Promise<void> {
        if (!this.cards.has(card.id)) {
            throw new Error(`Error: No se encontró la carta con ID ${card.id}.`);
        } else {
            this.cards.set(card.id, card);
        }
    }

    /**
     * Elimina una carta de la colección.
     * @param cardId El ID de la carta a eliminar.
     * @returns Una promesa que indica si la eliminación se realizó con éxito.
     * @throws Error si la carta no se encuentra en la colección.
     */
    public async deleteCard(cardId: number): Promise<void> {
        if (!this.cards.has(cardId)) {
            throw new Error(`Error: No se encontró la carta con ID ${cardId}.`);
        } else {
            this.cards.delete(cardId);
        }
    }

    /**
     * Lista todas las cartas de la colección.
     * @returns Una cadena de texto con la lista de cartas.
     */
    public listCards(): string {
        if (this.cards.size === 0) {
            return chalk.yellow('No hay cartas en la colección.');
        }
        let response = chalk.green('Listado de todas las cartas:\n');
        this.cards.forEach(card => {
            response += `ID: ${card.id}, Nombre: ${card.name}\n`;
        });
        return response;
    }

    /**
     * Obtiene los detalles de una carta específica.
     * @param cardId El ID de la carta.
     * @returns Una cadena de texto con los detalles de la carta.
     */
    public readCard(cardId: number): string {
        const card = this.cards.get(cardId);
        if (!card) {
            return chalk.red(`Error: No se encontró la carta con ID ${cardId}.`);
        }
        return `Detalles de la carta con ID ${cardId}: ` + JSON.stringify(card, null, 2);
    }
}
