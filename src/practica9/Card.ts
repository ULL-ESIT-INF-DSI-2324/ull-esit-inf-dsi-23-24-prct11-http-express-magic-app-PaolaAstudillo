/**
 * Enumeración de colores disponibles para las cartas Magic.
 */
export enum MagicColor {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Gris = "Gris",
  Multicolor = "Multicolor",
  Cian = "Cian",
  Amarillo = "Amarillo",
  Magenta = "Magenta"
}

/**
 * Enumeración de tipos disponibles para las cartas Magic.
 */
export enum MagicType {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantáneo = "Instantáneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

/**
 * Enumeración de rarezas disponibles para las cartas Magic.
 */
export enum MagicRarity {
  Común = "Común",
  PocoComún = "Poco común",
  Rara = "Rara",
  Mítica = "Mítica"
}

/**
 * Clase que representa una carta Magic con todas sus propiedades esenciales.
 * @param id - Identificador único de la carta.
 * @param name - Nombre de la carta.
 * @param manaCost - Coste de maná para jugar la carta.
 * @param color - Color de la carta, definido por la enumeración `MagicColor`.
 * @param type - Tipo de carta, definido por la enumeración `MagicType`.
 * @param rarity - Rareza de la carta, definido por la enumeración `MagicRarity`.
 * @param text - Texto de reglas de la carta.
 * @param marketValue - Valor de mercado de la carta.
 * @param powerToughness - (Opcional) Tupla que representa la fuerza y resistencia de las cartas de tipo Criatura.
 * @param loyalty - (Opcional) Puntos de lealtad para cartas de tipo Planeswalker.
 */
export class MagicCard {
  constructor(
      public id: number,
      public name: string,
      public manaCost: number,
      public color: MagicColor,
      public type: MagicType,
      public rarity: MagicRarity,
      public text: string,
      public marketValue: number,
      public powerToughness?: [number, number],
      public loyalty?: number
  ) {}

  // Método para convertir los datos de la carta a formato JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      manaCost: this.manaCost,
      color: this.color,
      type: this.type,
      rarity: this.rarity,
      text: this.text,
      marketValue: this.marketValue,
      powerToughness: this.powerToughness,
      loyalty: this.loyalty
    };
  }
}
