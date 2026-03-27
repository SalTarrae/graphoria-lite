import PropTypes from "prop-types";

export default function EdgeEditor({ edge, onChange, onDelete }) {
    if (!edge) {
        return null;
    }

    return (
        <aside className="editor">
            <h2>Relation editor</h2>

            <label>
                Relation label
                <input
                    type="text"
                    value={edge.label || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>

            <button className="danger-button" onClick={onDelete}>
                Delete relation
            </button>
        </aside>
    );
}

EdgeEditor.propTypes = {
    edge: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        source: PropTypes.string,
        target: PropTypes.string
    }),
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};