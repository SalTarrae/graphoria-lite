const express = require("express");
const router = express.Router();

let nodes = [];

/**
 * @swagger
 * /nodes:
 *   get:
 *     summary: Get all nodes
 *     responses:
 *       200:
 *         description: List of nodes
 */
router.get("/", (req, res) => {
    res.json(nodes);
});

/**
 * @swagger
 * /nodes:
 *   post:
 *     summary: Create a node
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 */
router.post("/", (req, res) => {
    const { name } = req.body;

    const newNode = {
        id: Date.now(),
        name,
    };

    nodes.push(newNode);
    res.status(201).json(newNode);
});

module.exports = router;