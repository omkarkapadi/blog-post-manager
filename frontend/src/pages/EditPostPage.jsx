import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postService } from "../services/postService";
import PostForm from "../components/posts/PostForm";
import { Spinner } from "../components/common/UIComponents";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getById(id);
        setPost(res.data);
      } catch (err) {
        toast.error("Post not found");
        navigate("/");
      } finally {
        setLoadingPost(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await postService.update(id, data);
      toast.success("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingPost) return <div className="page-container"><Spinner /></div>;

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="form-page-header">
          <div className="form-page-icon" style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <h1>Edit Post</h1>
          <p>Update the details of your blog post</p>
        </div>

        <PostForm
          defaultValues={post}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EditPostPage;
