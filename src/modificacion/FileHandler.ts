import { MagicCard } from '../modificacion/Card.js';
import * as fs from 'fs/promises';
import { join } from 'path';
/**
 * Clase para manejar archivos de cartas mágicas.
 */
export class MagicFileHandler {
   /**
   * Obtiene la ruta del archivo para una carta específica.
   * @param username Nombre de usuario.
   * @param cardId ID de la carta (opcional).
   * @returns Promesa que se resuelve con la ruta del archivo.
   */
   static getFilePath(username: string, cardId?: number): Promise<string> {
    const basePath = join(__dirname, '..', 'data', username);
    return fs.access(basePath) //intenta acceder al directorio
      .catch(() => fs.mkdir(basePath, { recursive: true })) //falla
      .then(() => cardId ? join(basePath, `${cardId}.json`) : basePath);
      // si el directorio existe o despues de crearlo, contruye y devulve la 
      //ruta del archivo o dir
  }
  
  /**
   * Guarda una carta en un archivo.
   * @param card Carta a guardar.
   * @param username Nombre de usuario.
   * @returns Promesa que se resuelve cuando se completa la escritura del archivo.
   */
  //metodo add-------------------------------
  static saveCardToFile(card: MagicCard, username: string): Promise<void> {
    return this.getFilePath(username, card.id)//obtiene ruta y devueve promesa
      .then(filePath => fs.writeFile(filePath, JSON.stringify(card, null, 2)));
      //para encadenar la operación de escritura del archivo teniendo ya la ruta
  }
  
  /**
   * Carga una carta desde un archivo.
   * @param cardId ID de la carta a cargar.
   * @param username Nombre de usuario.
   * @returns Promesa que se resuelve con la carta cargada o null si no se encuentra.
   */
  static async loadCardFromFile(cardId: number, username: string): Promise<MagicCard | null> {
    const filePath = await this.getFilePath(username, cardId);
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContent) as MagicCard;
    } catch {
      return null;
    }
  }
  /**
   * Elimina una carta de un archivo.
   * @param cardId ID de la carta a eliminar.
   * @param username Nombre de usuario.
   * @returns Promesa que se resuelve cuando se completa la eliminación del archivo.
   */
  //---------------------------------------
  static deleteCard(cardId: number, username: string): Promise<void> {
    return this.getFilePath(username, cardId) //obiene la ruta, devuelve promesa
      .then(filePath => fs.unlink(filePath)); //elimina el archivo de la ruta
  }
  
  /**
   * Carga todas las cartas de un usuario desde archivos.
   * @param username Nombre de usuario.
   * @returns Promesa que se resuelve con un array de cartas cargadas.
   */
  static async loadAllCards(username: string): Promise<MagicCard[]> {
    const basePath = await this.getFilePath(username);
    try {
      const files = await fs.readdir(basePath);
      const cards = await Promise.all(
        files.map(async file => {
          const content = await fs.readFile(join(basePath, file), 'utf8');
          return JSON.parse(content) as MagicCard;
        })
      );
      return cards;
    } catch {
      return [];
    }
  }
}