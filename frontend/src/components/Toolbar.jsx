export default function Toolbar({
                                    onAddNode,
                                    onSave,
                                    isSaving,
                                    hasSelectedNode
                                }) {
    return (
        <div className="toolbar">
            <button onClick={onAddNode}>Add node</button>
            <button onClick={onSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save graph"}
            </button>
            <span className="toolbar__hint">
        {hasSelectedNode
            ? "Select node details in the right panel"
            : "Click a node to edit it"}
      </span>
        </div>
    );
}