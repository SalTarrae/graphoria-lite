const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const {
    getGraph,
    saveGraph,
    getNodes,
    getNodeById,
    createNode,
    updateNode,
    deleteNode,
    getEdges,
    getEdgeById,
    createEdge,
    updateEdge,
    deleteEdge
} = require("./data/graphStore");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Node:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         position:
 *           type: object
 *           properties:
 *             x:
 *               type: number
 *             y:
 *               type: number
 *         data:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             type:
 *               type: string
 *             color:
 *               type: string
 *     Edge:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         source:
 *           type: string
 *         target:
 *           type: string
 *         type:
 *           type: string
 *         label:
 *           type: string
 *     Graph:
 *       type: object
 *       properties:
 *         nodes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Node'
 *         edges:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Edge'
 */

/**
 * @swagger
 * /api/graph:
 *   get:
 *     summary: Get full graph
 *     responses:
 *       200:
 *         description: Full graph data
 */
app.get("/api/graph", (req, res) => {
    res.json(getGraph());
});

/**
 * @swagger
 * /api/graph:
 *   post:
 *     summary: Replace full graph
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Graph'
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

    return res.json({
        message: "Graph saved successfully",
        graph: saved
    });
});

/**
 * @swagger
 * /api/nodes:
 *   get:
 *     summary: Get all nodes
 *     responses:
 *       200:
 *         description: List of nodes
 */
app.get("/api/nodes", (req, res) => {
    res.json(getNodes());
});

/**
 * @swagger
 * /api/nodes/{id}:
 *   get:
 *     summary: Get node by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Node found
 *       404:
 *         description: Node not found
 */
app.get("/api/nodes/:id", (req, res) => {
    const node = getNodeById(req.params.id);

    if (!node) {
        return res.status(404).json({ message: "Node not found" });
    }

    return res.json(node);
});

/**
 * @swagger
 * /api/nodes:
 *   post:
 *     summary: Create node
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Node'
 *     responses:
 *       201:
 *         description: Node created
 */
app.post("/api/nodes", (req, res) => {
    const { id, position, data } = req.body;

    if (!id || !position || !data || !data.title) {
        return res.status(400).json({
            message: "Invalid node payload"
        });
    }

    if (getNodeById(id)) {
        return res.status(409).json({
            message: "Node with this ID already exists"
        });
    }

    const newNode = createNode({
        id,
        position,
        data
    });

    return res.status(201).json(newNode);
});

/**
 * @swagger
 * /api/nodes/{id}:
 *   put:
 *     summary: Update node
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Node'
 *     responses:
 *       200:
 *         description: Node updated
 *       404:
 *         description: Node not found
 */
app.put("/api/nodes/:id", (req, res) => {
    const updatedNode = updateNode(req.params.id, req.body);

    if (!updatedNode) {
        return res.status(404).json({ message: "Node not found" });
    }

    return res.json(updatedNode);
});

/**
 * @swagger
 * /api/nodes/{id}:
 *   delete:
 *     summary: Delete node
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Node deleted
 *       404:
 *         description: Node not found
 */
app.delete("/api/nodes/:id", (req, res) => {
    const removedNode = deleteNode(req.params.id);

    if (!removedNode) {
        return res.status(404).json({ message: "Node not found" });
    }

    return res.json({
        message: "Node deleted successfully",
        node: removedNode
    });
});

/**
 * @swagger
 * /api/edges:
 *   get:
 *     summary: Get all edges
 *     responses:
 *       200:
 *         description: List of edges
 */
app.get("/api/edges", (req, res) => {
    res.json(getEdges());
});

/**
 * @swagger
 * /api/edges:
 *   post:
 *     summary: Create edge
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Edge'
 *     responses:
 *       201:
 *         description: Edge created
 */
app.post("/api/edges", (req, res) => {
    const { id, source, target, type, label } = req.body;

    if (!id || !source || !target) {
        return res.status(400).json({
            message: "Invalid edge payload"
        });
    }

    if (getEdgeById(id)) {
        return res.status(409).json({
            message: "Edge with this ID already exists"
        });
    }

    if (!getNodeById(source) || !getNodeById(target)) {
        return res.status(400).json({
            message: "Source or target node does not exist"
        });
    }

    const newEdge = createEdge({
        id,
        source,
        target,
        type: type || "smoothstep",
        label: label || "related to"
    });

    return res.status(201).json(newEdge);
});

/**
 * @swagger
 * /api/edges/{id}:
 *   put:
 *     summary: Update edge
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Edge'
 *     responses:
 *       200:
 *         description: Edge updated
 *       404:
 *         description: Edge not found
 */
app.put("/api/edges/:id", (req, res) => {
    const updatedEdge = updateEdge(req.params.id, req.body);

    if (!updatedEdge) {
        return res.status(404).json({ message: "Edge not found" });
    }

    return res.json(updatedEdge);
});

/**
 * @swagger
 * /api/edges/{id}:
 *   delete:
 *     summary: Delete edge
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Edge deleted
 *       404:
 *         description: Edge not found
 */
app.delete("/api/edges/:id", (req, res) => {
    const removedEdge = deleteEdge(req.params.id);

    if (!removedEdge) {
        return res.status(404).json({ message: "Edge not found" });
    }

    return res.json({
        message: "Edge deleted successfully",
        edge: removedEdge
    });
});

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Backend started on http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});