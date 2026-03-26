export default function GraphNode({ data }) {
    return (
        <div
            className="graph-node"
            style={{
                borderColor: data.color || "#2563eb"
            }}
        >
            <div
                className="graph-node__header"
                style={{
                    backgroundColor: data.color || "#2563eb"
                }}
            >
                {data.title || "Untitled"}
            </div>

            <div className="graph-node__body">
                <div className="graph-node__type">{data.type || "concept"}</div>
                <div className="graph-node__description">
                    {data.description || "No description"}
                </div>
            </div>
        </div>
    );
}