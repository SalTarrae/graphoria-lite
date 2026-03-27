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

module.exports = {
    getGraph,
    saveGraph
};