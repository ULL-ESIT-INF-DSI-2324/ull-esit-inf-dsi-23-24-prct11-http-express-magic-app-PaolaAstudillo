import express from 'express';
import { MagicCardCollection } from '../practica9/CardCollection.js';
import { MagicCard, MagicColor, MagicType, MagicRarity } from '../practica9/Card.js';

const router = express.Router();

/**
 * Maneja la solicitud POST para agregar una nueva carta a la colección.
 * @param req El objeto de solicitud.
 * @param res El objeto de respuesta.
 * @returns Una respuesta JSON que indica el resultado de la operación.
 */
router.post('/cards', (req, res) => {
    const { id, name, manaCost, color, type, rarity, text, marketValue, powerToughness, loyalty, username } = req.body;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const cardCollection = new MagicCardCollection(username);
        const card = new MagicCard(
            id,
            name,
            manaCost,
            MagicColor[color as keyof typeof MagicColor],
            MagicType[type as keyof typeof MagicType],
            MagicRarity[rarity as keyof typeof MagicRarity],
            text,
            marketValue,
            powerToughness,
            loyalty
        );
        cardCollection.addCard(card);
        return res.status(201).json({ message: `Card with ID ${id} added successfully.` });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

/**
 * Maneja la solicitud GET para listar todas las cartas de un usuario.
 * @param req El objeto de solicitud.
 * @param res El objeto de respuesta.
 * @returns Una respuesta JSON que contiene las cartas del usuario o un mensaje de error.
 */
router.get('/cards', (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const cardCollection = new MagicCardCollection(username.toString());
        const cards = cardCollection.listCards();
        return res.status(200).send(cards);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Maneja la solicitud GET para obtener detalles de una carta específica de un usuario.
 * @param req El objeto de solicitud.
 * @param res El objeto de respuesta.
 * @returns Una respuesta JSON que contiene los detalles de la carta solicitada o un mensaje de error.
 */
router.get('/cards/:id', (req, res) => {
    const { username } = req.query;
    const { id } = req.params;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const cardCollection = new MagicCardCollection(username.toString());
    try {
        const cardDetails = cardCollection.readCard(parseInt(id));
        if (cardDetails.includes("Error")) {
            return res.status(404).json({ error: cardDetails });
        } else {
            return res.status(200).json({ details: cardDetails });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Maneja la solicitud DELETE para eliminar una carta de la colección de un usuario.
 * @param req El objeto de solicitud.
 * @param res El objeto de respuesta.
 * @returns Una respuesta JSON que indica el resultado de la operación.
 */
router.delete('/cards/:id', (req, res) => {
    const { username } = req.query;
    const { id } = req.params;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const cardCollection = new MagicCardCollection(username.toString());
    try {
        const result = cardCollection.deleteCard(parseInt(id));
        return res.status(200).json({ message: result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Maneja la solicitud PATCH para actualizar los detalles de una carta existente en la colección de un usuario.
 * @param req El objeto de solicitud.
 * @param res El objeto de respuesta.
 * @returns Una respuesta JSON que indica el resultado de la operación.
 */
router.patch('/cards/:id', (req, res) => {
    const { username } = req.query;
    const { id } = req.params;
    const cardData = req.body;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const cardCollection = new MagicCardCollection(username.toString());
    try {
        const updatedCard = new MagicCard(
            parseInt(id),
            cardData.name,
            cardData.manaCost,
            MagicColor[cardData.color as keyof typeof MagicColor],
            MagicType[cardData.type as keyof typeof MagicType],
            MagicRarity[cardData.rarity as keyof typeof MagicRarity],
            cardData.text,
            cardData.marketValue,
            cardData.powerToughness,
            cardData.loyalty
        );
        cardCollection.updateCard(updatedCard);
        return res.status(200).json({ message: `Card with ID ${id} updated successfully.` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
