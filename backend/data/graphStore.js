/**
 * In-memory storage for graph data.
 * Store nodes and edges for default Graphoria Lite session.
 * This storage is temporary and will be lost when the server is restarted.
 *
 * @module graphStore
 */

let graphData = {
    nodes: [
        {
            id: "node-1",
            position: { x: 300, y: -80 },
            data: {
                title: "Main Idea",
                description: "This is the first node on the canvas.",
                type: "concept",
                color: "#2563eb"
            }
        },
        {
            id: "node-2",
            position: { x: 150, y: 120 },
            data: {
                title: "Reference",
                description: "Connected node example.",
                type: "reference",
                color: "#059669"
            }
        },
        {
            id: "node-3",
            position: { x: 450, y: 120 },
            data: {
                title: "Child Node B",
                description: "Second linked element",
                type: "reference",
                color: "#7c3aed"
            }
        }
    ],
    edges: [
        {
            id: "edge-1-2",
            source: "node-1",
            target: "node-2",
            type: "smoothstep",
            label: "contains"
        },
        {
            id: "edge-1-3",
            source: "node-1",
            target: "node-3",
            type: "smoothstep",
            label: "references"
        }
    ]
};

/**
 * Get the full graph data.
 *
 * @returns {{nodes: Array, edges: Array}} Full graph data.
 */
function getGraph() {
    return graphData;
}

/**
 * Replaces the current graph with a new graph object.
 *
 * @param {{nodes: Array, edges: Array}} newGraph - New graph data.
 * @returns {{nodes: Array, edges: Array}} Updated graph data.
 */
function saveGraph(newGraph) {
    graphData = {
        nodes: Array.isArray(newGraph.nodes) ? newGraph.nodes : [],
        edges: Array.isArray(newGraph.edges) ? newGraph.edges : []
    };
    return graphData;
}

/**
 * Returns all nodes.
 *
 * @returns {Array} List of graph nodes.
 */
function getNodes() {
    return graphData.nodes;
}

/**
 * Finds a node by its identifier.
 *
 *  * @param {string} id - Node identifier.
 *  * @returns {Object|undefined} Found node or undefined.
 */
function getNodeById(id) {
    return graphData.nodes.find((node) => node.id === id);
}

/**
 * Create a new node and add it to the storage
 *
 *  @param {Object} node - Node object to create.
 *  @returns {Object} Created node.
 */
function createNode(node) {
    graphData.nodes.push(node);
    return node;
}

/**
 * Update the node with the specified ID. Properties of the node are updated with the properties of the updatedFields object.
 * If the node is not found, return null.
 *
 *  @param {string} id - Node identifier.
 *  @param {Object} updatedFields - Fields to update.
 *  @returns {Object|null} Updated node or null if not found.
 */
function updateNode(id, updatedFields) {
    const index = graphData.nodes.findIndex((node) => node.id === id);

    if (index === -1) {
        return null;
    }

    graphData.nodes[index] = {
        ...graphData.nodes[index],
        ...updatedFields,
        data: {
            ...graphData.nodes[index].data,
            ...(updatedFields.data || {})
        },
        position: {
            ...graphData.nodes[index].position,
            ...(updatedFields.position || {})
        }
    };

    return graphData.nodes[index];
}

/**
 * Delete the node with the specified ID. If the node is not found, return null.
 *
 *  @param {string} id - Node identifier.
 *  @returns {Object|null} Removed node or null if not found.
 */
function deleteNode(id) {
    const node = getNodeById(id);

    if (!node) {
        return null;
    }

    graphData.nodes = graphData.nodes.filter((item) => item.id !== id);
    graphData.edges = graphData.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
    );

    return node;
}

/**
 * Return all edges in the graph
 *
 * @returns {Array} List of graph edges.
 */
function getEdges() {
    return graphData.edges;
}

/**
 * Finds an edge by its identifier.
 *
 *  @param {string} id - Edge identifier.
 *  @returns {Object|undefined} Found edge or undefined.
 */
function getEdgeById(id) {
    return graphData.edges.find((edge) => edge.id === id);
}

/**
 * Create a new edge and add it to the storage
 *
 *  @param {Object} edge - Edge object to create.
 *  @returns {Object} Created edge.
 */
function createEdge(edge) {
    graphData.edges.push(edge);
    return edge;
}

/**
 * Update the edge with the specified ID. Properties of the edge are updated with the properties of the updatedFields object.
 * If the edge is not found, return null.
 *
 *  @param {string} id - Edge identifier.
 *  @param {Object} updatedFields - Fields to update.
 *  @returns {Object|null} Updated edge or null if not found.
 */
function updateEdge(id, updatedFields) {
    const index = graphData.edges.findIndex((edge) => edge.id === id);

    if (index === -1) {
        return null;
    }

    graphData.edges[index] = {
        ...graphData.edges[index],
        ...updatedFields
    };

    return graphData.edges[index];
}

/**
 * Delete the edge with the specified ID. If the edge is not found, return null.
 *
 *  @param {string} id - Edge identifier.
 *  @returns {Object|null} Removed edge or null if not found.
 */
function deleteEdge(id) {
    const edge = getEdgeById(id);

    if (!edge) {
        return null;
    }

    graphData.edges = graphData.edges.filter((item) => item.id !== id);
    return edge;
}

module.exports = {
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
};