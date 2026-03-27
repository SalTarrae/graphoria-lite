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

function getGraph() {
    return graphData;
}

function saveGraph(newGraph) {
    graphData = {
        nodes: Array.isArray(newGraph.nodes) ? newGraph.nodes : [],
        edges: Array.isArray(newGraph.edges) ? newGraph.edges : []
    };
    return graphData;
}

function getNodes() {
    return graphData.nodes;
}

function getNodeById(id) {
    return graphData.nodes.find((node) => node.id === id);
}

function createNode(node) {
    graphData.nodes.push(node);
    return node;
}

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

function getEdges() {
    return graphData.edges;
}

function getEdgeById(id) {
    return graphData.edges.find((edge) => edge.id === id);
}

function createEdge(edge) {
    graphData.edges.push(edge);
    return edge;
}

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