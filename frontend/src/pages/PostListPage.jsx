import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePosts } from "../hooks/usePosts";
import { postService } from "../services/postService";
import { StatusBadge, CategoryBadge } from "../components/common/Badge";
import Pagination from "../components/common/Pagination";
import ActionMenu from "../components/posts/ActionMenu";
import { Spinner, EmptyState, ConfirmModal } from "../components/common/UIComponents";
import { CATEGORIES } from "../utils/validation";

const PostListPage = () => {
  const navigate = useNavigate();
  const { posts, pagination, loading, error, params, updateParams, refetch } = usePosts();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchInput, page: 1 });
  };

  const handleSearchClear = () => {
    setSearchInput("");
    updateParams({ search: "", page: 1 });
  };

  const handleFilterChange = (key, value) => {
    updateParams({ [key]: value, page: 1 });
  };

  const handlePageChange = (page) => updateParams({ page });

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await postService.remove(deleteTarget);
      toast.success("Post deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }, [deleteTarget, refetch]);

  const handleExportCSV = () => {
    postService.exportCSV({ search: params.search, category: params.category, status: params.status });
    toast.success("CSV export started");
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Blog Post Manager</h1>
          <p className="page-header__subtitle">Manage and organize your blog posts</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--secondary" onClick={handleExportCSV}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export CSV
          </button>
          <button className="btn btn--primary" onClick={() => navigate("/posts/new")}>
            + Add Post
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: "flex", gap: ".5rem", minWidth: "200px" }}>
          <div className="search-input-wrap" style={{ flex: 1 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="form-control"
              placeholder="Search by title, author, category…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn--primary btn--sm">Search</button>
          {params.search && (
            <button type="button" className="btn btn--secondary btn--sm" onClick={handleSearchClear}>Clear</button>
          )}
        </form>

        <select
          className="form-control filter-select"
          value={params.category || ""}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          className="form-control filter-select"
          value={params.status || ""}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Table card */}
      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <EmptyState icon="⚠️" title="Failed to load posts" message={error} />
        ) : posts.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No posts found"
            message={params.search ? "Try adjusting your search or filters." : "Click '+ Add Post' to create your first post."}
          />
        ) : (
          <>
            <div className="table-wrapper" style={{ borderRadius: "var(--radius-lg) var(--radius-lg) 0 0", border: "none" }}>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, idx) => (
                    <tr key={post._id}>
                      <td style={{ color: "var(--clr-muted)", fontSize: ".8rem" }}>
                        {(pagination.currentPage - 1) * pagination.limit + idx + 1}
                      </td>
                      <td>
                        <span
                          style={{ fontWeight: 600, cursor: "pointer", color: "var(--clr-primary)" }}
                          onClick={() => navigate(`/posts/${post._id}`)}
                        >
                          {post.title}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{post.author}</div>
                        <div style={{ fontSize: ".78rem", color: "var(--clr-muted)" }}>{post.authorEmail}</div>
                      </td>
                      <td><CategoryBadge category={post.category} /></td>
                      <td><StatusBadge status={post.status} /></td>
                      <td style={{ color: "var(--clr-muted)", fontSize: ".85rem" }}>{formatDate(post.createdAt)}</td>
                      <td>
                        <ActionMenu postId={post._id} onDelete={setDeleteTarget} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination pagination={pagination} onPageChange={handlePageChange} />
          </>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <ConfirmModal
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </div>
  );
};

export default PostListPage;
