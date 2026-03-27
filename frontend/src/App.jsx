import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    MarkerType
} from "reactflow";

import { fetchGraph, saveGraph } from "./api/graphApi";
import { createNewNode } from "./utils/nodeFactory";
import Toolbar from "./components/Toolbar.jsx";
import NodeEditor from "./components/NodeEditor.jsx";
import GraphNode from "./components/GraphNode.jsx";
import EdgeEditor from "./components/EdgeEditor";


function renderSidebar() {
    if (selectedNode) {
        return (
            <NodeEditor
                node={selectedNode}
                onChange={handleNodeDataChange}
                onDelete={handleDeleteNode}
            />
        );
    }

    if (selectedEdge) {
        return (
            <EdgeEditor
                edge={selectedEdge}
                onChange={handleEdgeLabelChange}
                onDelete={handleDeleteEdge}
            />
        );
    }

    return (
        <aside className="editor">
            <h2>Editor</h2>
            <p>Select a node or relation on the canvas.</p>
        </aside>
    );
}

function AppContent() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedEdgeId, setSelectedEdgeId] = useState(null);

    const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId) || null;

    useEffect(() => {
        async function loadGraph() {
            try {
                const graph = await fetchGraph();

                const preparedNodes = (graph.nodes || []).map((node) => ({
                    ...node,
                    type: "graphNode"
                }));

                setNodes(preparedNodes);
                setEdges(graph.edges || []);
            } catch (error) {
                console.error("Failed to load graph:", error);
            }
        }

        loadGraph();
    }, [setNodes, setEdges]);

    const nodeTypes = useMemo(
        () => ({
            graphNode: GraphNode
        }),
        []
    );

    const selectedNode = nodes.find((node) => node.id === selectedNodeId) || null;

    const onConnect = useCallback(
        (connection) => {
            setEdges((currentEdges) =>
                addEdge(
                    {
                        ...connection,
                        id: `edge-${connection.source}-${connection.target}-${Date.now()}`,
                        type: "smoothstep",
                        label: "references",
                        animated: false,
                        markerEnd: {
                            type: MarkerType.ArrowClosed
                        },
                        style: {
                            strokeWidth: 2
                        },
                        labelStyle: {
                            fontSize: 12,
                            fontWeight: 600
                        },
                        labelBgPadding: [6, 3],
                        labelBgBorderRadius: 4,
                        labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 }
                    },
                    currentEdges
                )
            );
        },
        [setEdges]
    );

    const onNodeClick = useCallback((_, node) => {
        setSelectedNodeId(node.id);
    }, []);

    const handleAddNode = useCallback(() => {
        const newNode = createNewNode(nodes.length + 1);
        setNodes((currentNodes) => [...currentNodes, newNode]);
        setSelectedNodeId(newNode.id);
    }, [nodes.length, setNodes]);

    const handleNodeDataChange = useCallback(
        (field, value) => {
            setNodes((currentNodes) =>
                currentNodes.map((node) =>
                    node.id === selectedNodeId
                        ? {
                            ...node,
                            data: {
                                ...node.data,
                                [field]: value
                            }
                        }
                        : node
                )
            );
        },
        [selectedNodeId, setNodes]
    );

    const handleDeleteNode = useCallback(() => {
        if (!selectedNodeId) return;

        setNodes((currentNodes) =>
            currentNodes.filter((node) => node.id !== selectedNodeId)
        );

        setEdges((currentEdges) =>
            currentEdges.filter(
                (edge) =>
                    edge.source !== selectedNodeId && edge.target !== selectedNodeId
            )
        );

        setSelectedNodeId(null);
    }, [selectedNodeId, setNodes, setEdges]);

    const handleSave = useCallback(async () => {
        setIsSaving(true);

        try {
            const payload = {
                nodes: nodes.map((node) => ({
                    id: node.id,
                    position: node.position,
                    data: node.data
                })),
                edges
            };

            await saveGraph(payload);
            alert("Graph saved successfully");
        } catch (error) {
            console.error("Failed to save graph:", error);
            alert("Failed to save graph");
        } finally {
            setIsSaving(false);
        }
    }, [nodes, edges]);

    const onEdgeClick = useCallback((_, edge) => {
        setSelectedEdgeId(edge.id);
        setSelectedNodeId(null);
    }, []);

    const handleDeleteEdge = useCallback(() => {
        if (!selectedEdgeId) return;

        setEdges((currentEdges) =>
            currentEdges.filter((edge) => edge.id !== selectedEdgeId)
        );
        setSelectedEdgeId(null);
    }, [selectedEdgeId, setEdges]);

    const handleEdgeLabelChange = useCallback(
        (value) => {
            setEdges((currentEdges) =>
                currentEdges.map((edge) =>
                    edge.id === selectedEdgeId
                        ? {
                            ...edge,
                            label: value
                        }
                        : edge
                )
            );
        },
        [selectedEdgeId, setEdges]
    );

    return (
        <div className="app-layout">
            <div className="main-area">
                <Toolbar
                    onAddNode={handleAddNode}
                    onSave={handleSave}
                    isSaving={isSaving}
                    hasSelectedNode={!!selectedNode}
                />

                <div className="canvas-wrapper">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onEdgeClick={onEdgeClick}
                        fitView
                    >
                        <MiniMap />
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>
            </div>

            {renderSidebar()}
        </div>
    );
}

export default function App() {
    return (
        <ReactFlowProvider>
            <AppContent />
        </ReactFlowProvider>
    );
}