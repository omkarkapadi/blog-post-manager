import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema, CATEGORIES, STATUSES } from "../../utils/validation";

const PostForm = ({ defaultValues = {}, onSubmit, loading, submitLabel = "Publish Post" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: "",
      author: "",
      authorEmail: "",
      category: "",
      status: "Draft",
      shortDescription: "",
      content: "",
      tags: "",
      thumbnailUrl: "",
      ...defaultValues,
      tags: Array.isArray(defaultValues.tags)
        ? defaultValues.tags.join(", ")
        : defaultValues.tags || "",
    },
  });

  const Field = ({ id, label, required, error, children }) => (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <span className="form-error">⚠ {error.message}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Basic Info */}
      <div className="form-section">
        <p className="form-section__title">Basic Information</p>
        <div className="form-row form-row--2">
          <Field id="title" label="Title" required error={errors.title}>
            <input
              id="title"
              className={`form-control${errors.title ? " error" : ""}`}
              placeholder="Enter post title"
              {...register("title")}
            />
          </Field>
          <Field id="author" label="Author Name" required error={errors.author}>
            <input
              id="author"
              className={`form-control${errors.author ? " error" : ""}`}
              placeholder="Enter author name"
              {...register("author")}
            />
          </Field>
        </div>
        <Field id="authorEmail" label="Email Address" required error={errors.authorEmail}>
          <input
            id="authorEmail"
            type="email"
            className={`form-control${errors.authorEmail ? " error" : ""}`}
            placeholder="author@example.com"
            {...register("authorEmail")}
          />
        </Field>
      </div>

      {/* Classification */}
      <div className="form-section">
        <p className="form-section__title">Classification</p>
        <div className="form-row form-row--3">
          <Field id="category" label="Category" required error={errors.category}>
            <select
              id="category"
              className={`form-control${errors.category ? " error" : ""}`}
              {...register("category")}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field id="status" label="Status" error={errors.status}>
            <select id="status" className="form-control" {...register("status")}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field id="tags" label="Tags" error={errors.tags}>
            <input
              id="tags"
              className="form-control"
              placeholder="react, nodejs, web"
              {...register("tags")}
            />
            <span style={{ fontSize: ".75rem", color: "var(--clr-muted)" }}>Separate with commas</span>
          </Field>
        </div>
      </div>

      {/* Media */}
      <div className="form-section">
        <p className="form-section__title">Media</p>
        <Field id="thumbnailUrl" label="Thumbnail URL" error={errors.thumbnailUrl}>
          <input
            id="thumbnailUrl"
            className={`form-control${errors.thumbnailUrl ? " error" : ""}`}
            placeholder="https://example.com/image.jpg"
            {...register("thumbnailUrl")}
          />
        </Field>
      </div>

      {/* Content */}
      <div className="form-section">
        <p className="form-section__title">Content</p>
        <Field id="shortDescription" label="Short Description" required error={errors.shortDescription}>
          <textarea
            id="shortDescription"
            className={`form-control${errors.shortDescription ? " error" : ""}`}
            placeholder="Brief summary of the post (max 500 characters)"
            rows={3}
            {...register("shortDescription")}
          />
        </Field>
        <Field id="content" label="Post Content" required error={errors.content}>
          <textarea
            id="content"
            className={`form-control${errors.content ? " error" : ""}`}
            placeholder="Write your full blog post content here..."
            rows={10}
            {...register("content")}
          />
        </Field>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--secondary" onClick={() => window.history.back()}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
