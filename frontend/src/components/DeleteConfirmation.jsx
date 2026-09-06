import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

import "./DeleteConfirmation.css";

const DeleteConfirmation = ({
  itemName,
  itemType = "item",
  open,
  deleting = false,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div
      className="delete-confirmation-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) onCancel();
      }}
    >
      <div
        className="delete-confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirmation-title"
      >
        <div className="delete-confirmation-icon">
          <FaExclamationTriangle />
        </div>
        <span className="delete-confirmation-eyebrow">
          DELETE {itemType.toUpperCase()}
        </span>
        <h2 id="delete-confirmation-title">
          Delete this {itemType.toLowerCase()}?
        </h2>
        <p>
          You are about to permanently delete <strong>{itemName}</strong>. This
          action cannot be undone.
        </p>
        <div className="delete-confirmation-actions">
          <button
            type="button"
            className="delete-confirmation-cancel"
            onClick={onCancel}
            disabled={deleting}
          >
            Keep {itemType}
          </button>
          <button
            type="button"
            className="delete-confirmation-confirm"
            onClick={onConfirm}
            disabled={deleting}
          >
            <FaTrash />
            {deleting ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
