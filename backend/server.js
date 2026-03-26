const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const { getGraph, saveGraph } = require("./data/graphStore");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /api/graph:
 *   get:
 *     summary: Get graph data
 *     description: Returns all nodes and edges for the current graph.
 *     responses:
 *       200:
 *         description: Graph loaded successfully
 */
app.get("/api/graph", (req, res) => {
    res.json(getGraph());
});

/**
 * @swagger
 * /api/graph:
 *   post:
 *     summary: Save graph data
 *     description: Saves all nodes and edges for the current graph.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nodes:
 *                 type: array
 *               edges:
 *                 type: array
 *     responses:
 *       200:
 *         description: Graph saved successfully
 */
app.post("/api/graph", (req, res) => {
    const graph = req.body;

    if (!graph || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) {
        return res.status(400).json({
            message: "Invalid graph payload. Expected { nodes: [], edges: [] }"
        });
    }

    const saved = saveGraph(graph);
    res.json({
        message: "Graph saved successfully",
        graph: saved
    });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Backend started on http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});