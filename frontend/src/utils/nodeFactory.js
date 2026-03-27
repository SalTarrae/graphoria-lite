export function createNewNode(sequence = 1) {
    const id = `node-${Date.now()}-${sequence}`;

    return {
        id,
        type: "graphNode",
        position: {
            x: 100 + sequence * 40,
            y: 100 + sequence * 30
        },
        data: {
            title: `New Node ${sequence}`,
            description: "Add your description here",
            type: "concept",
            color: "#7c3aed"
        }
    };
}