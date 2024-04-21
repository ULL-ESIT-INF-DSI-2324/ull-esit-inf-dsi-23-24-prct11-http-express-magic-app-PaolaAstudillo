/**
 * Enumeración de colores disponibles para las cartas Magic.
 */
export enum MagicColor {
    White = "White",
    Blue = "Blue",
    Black = "Black",
    Red = "Red",
    Green = "Green",
    Grey = "Grey",
    Multicolored = "Multicolored",
    Cyan = "Cyan",
    Yellow = "Yellow",
    Magenta = "Magenta"
  }
  
  /**
  * Enumeración de tipos disponibles para las cartas Magic.
  */
  export enum MagicType {
    Land = "Land",
    Creature = "Creature",
    Enchantment = "Enchantment",
    Sorcery = "Sorcery",
    Instant = "Instant",
    Artifact = "Artifact",
    Planeswalker = "Planeswalker"
  }
  
  /**
  * Enumeración de rarezas disponibles para las cartas Magic.
  */
  export enum MagicRarity {
    Common = "Common",
    Uncommon = "Uncommon",
    Rare = "Rare",
    Mythic = "Mythic"
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
  }