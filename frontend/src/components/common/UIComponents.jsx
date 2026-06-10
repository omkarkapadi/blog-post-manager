import React from "react";

export const Spinner = () => (
  <div className="spinner-wrap">
    <div className="spinner" />
  </div>
);

export const EmptyState = ({ icon = "📝", title = "No results found", message = "" }) => (
  <div className="empty-state">
    <div className="empty-state__icon">{icon}</div>
    <div className="empty-state__title">{title}</div>
    {message && <p>{message}</p>}
  </div>
);

export const ConfirmModal = ({ title, message, onConfirm, onCancel, loading }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3 className="modal__title">{title}</h3>
      <p className="modal__body">{message}</p>
      <div className="modal__actions">
        <button className="btn btn--secondary" onClick={onCancel} disabled={loading}>Cancel</button>
        <button className="btn btn--danger" onClick={onConfirm} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);
