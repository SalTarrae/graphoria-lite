let graphData = {
    nodes: [
        {
            id: "node-1",
            position: { x: 100, y: 100 },
            data: {
                title: "Main Idea",
                description: "This is the first node on the canvas.",
                type: "concept",
                color: "#2563eb"
            }
        },
        {
            id: "node-2",
            position: { x: 420, y: 220 },
            data: {
                title: "Reference",
                description: "Connected node example.",
                type: "reference",
                color: "#059669"
            }
        }
    ],
    edges: [
        {
            id: "edge-node-1-node-2",
            source: "node-1",
            target: "node-2",
            label: "relates to"
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

module.exports = {
    getGraph,
    saveGraph
};