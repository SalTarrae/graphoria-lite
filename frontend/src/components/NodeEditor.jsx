import PropTypes from "prop-types";

export default function NodeEditor({ node, onChange, onDelete }) {
    if (!node) {
        return (
            <aside className="editor">
                <h2>Node editor</h2>
                <p>Select a node on the canvas to edit its data.</p>
            </aside>
        );
    }

    const data = node.data || {};

    return (
        <aside className="editor">
            <h2>Node editor</h2>

            <label>
                Title
                <input
                    type="text"
                    value={data.title || ""}
                    onChange={(e) => onChange("title", e.target.value)}
                />
            </label>

            <label>
                Description
                <textarea
                    rows="5"
                    value={data.description || ""}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </label>

            <label>
                Type
                <select
                    value={data.type || "concept"}
                    onChange={(e) => onChange("type", e.target.value)}
                >
                    <option value="concept">Concept</option>
                    <option value="reference">Reference</option>
                    <option value="category">Category</option>
                    <option value="task">Task</option>
                </select>
            </label>

            <label>
                Color
                <input
                    type="color"
                    value={data.color || "#2563eb"}
                    onChange={(e) => onChange("color", e.target.value)}
                />
            </label>

            <button className="danger-button" onClick={onDelete}>
                Delete node
            </button>
        </aside>
    );
}

NodeEditor.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string,
        data: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            type: PropTypes.string,
            color: PropTypes.string
        })
    }),
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};