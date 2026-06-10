import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postService } from "../services/postService";
import PostForm from "../components/posts/PostForm";

const AddPostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await postService.create(data);
      toast.success("Post created successfully!");
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="form-page-header">
          <div className="form-page-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <h1>Create New Post</h1>
          <p>Fill in the details to publish your blog post</p>
        </div>

        <PostForm onSubmit={handleSubmit} loading={loading} submitLabel="Publish Post" />
      </div>
    </div>
  );
};

export default AddPostPage;
