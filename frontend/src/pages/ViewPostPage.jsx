import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postService } from "../services/postService";
import { StatusBadge } from "../components/common/Badge";
import { Spinner, ConfirmModal } from "../components/common/UIComponents";

const ViewPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getById(id);
        setPost(res.data);
      } catch (err) {
        toast.error("Post not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await postService.remove(id);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  if (loading) return <div className="page-container"><Spinner /></div>;
  if (!post) return null;

  return (
    <div className="page-container">
      {/* Back nav */}
      <button
        className="btn btn--ghost"
        onClick={() => navigate("/")}
        style={{ marginBottom: "1rem", paddingLeft: 0 }}
      >
        ← Back to Posts
      </button>

      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-hero__category">📁 {post.category}</div>
        <h1 className="detail-hero__title">{post.title}</h1>
        <div className="detail-hero__meta">
          <span className="detail-hero__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            {post.author}
          </span>
          <span className="detail-hero__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />
            </svg>
            {post.authorEmail}
          </span>
          <span className="detail-hero__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: ".6rem", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
        <button className="btn btn--secondary" onClick={() => navigate(`/posts/${id}/edit`)}>
          ✏️ Edit Post
        </button>
        <button className="btn btn--danger" onClick={() => setShowDeleteModal(true)}>
          🗑 Delete
        </button>
      </div>

      {/* Thumbnail */}
      {post.thumbnailUrl && (
        <div style={{ marginBottom: "1.25rem", borderRadius: "var(--radius-lg)", overflow: "hidden", maxHeight: "320px" }}>
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            style={{ width: "100%", height: "320px", objectFit: "cover" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      )}

      {/* Content grid */}
      <div className="detail-grid">
        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card">
            <div className="detail-section__label">Summary</div>
            <p className="detail-section__value" style={{ fontStyle: "italic", color: "var(--clr-muted)" }}>
              {post.shortDescription}
            </p>
          </div>

          <div className="card">
            <div className="detail-section__label">Full Content</div>
            <div
              className="detail-section__value"
              style={{ whiteSpace: "pre-wrap", lineHeight: 1.85 }}
            >
              {post.content}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card">
            <div className="detail-section__label" style={{ marginBottom: ".75rem" }}>Post Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
              {[
                { label: "Status", value: <StatusBadge status={post.status} /> },
                { label: "Category", value: post.category },
                { label: "Author", value: post.author },
                { label: "Email", value: <a href={`mailto:${post.authorEmail}`} style={{ color: "var(--clr-primary)" }}>{post.authorEmail}</a> },
                { label: "Created", value: formatDate(post.createdAt) },
                { label: "Updated", value: formatDate(post.updatedAt) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="detail-section__label">{label}</div>
                  <div className="detail-section__value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {post.tags?.length > 0 && (
            <div className="card">
              <div className="detail-section__label" style={{ marginBottom: ".6rem" }}>Tags</div>
              <div className="tag-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          title="Delete Post"
          message={`Are you sure you want to delete "${post.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={deleting}
        />
      )}
    </div>
  );
};

export default ViewPostPage;
