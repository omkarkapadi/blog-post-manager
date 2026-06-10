import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ActionMenu = ({ postId, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        className="btn btn--ghost btn--sm"
        onClick={() => setOpen((o) => !o)}
        aria-label="Actions"
      >
        ⋮
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "110%",
            background: "var(--clr-surface)",
            border: "1px solid var(--clr-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md)",
            minWidth: "140px",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          {[
            { label: "👁 View", action: () => navigate(`/posts/${postId}`) },
            { label: "✏️ Edit", action: () => navigate(`/posts/${postId}/edit`) },
            { label: "🗑 Delete", action: () => { setOpen(false); onDelete(postId); }, danger: true },
          ].map(({ label, action, danger }) => (
            <button
              key={label}
              onClick={() => { action(); setOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                padding: ".55rem 1rem",
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: ".875rem",
                color: danger ? "var(--clr-danger)" : "var(--clr-text)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.target.style.background = "none")}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
