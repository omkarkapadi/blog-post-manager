const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [2, "Author name must be at least 2 characters"],
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    authorEmail: {
      type: String,
      required: [true, "Author email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Technology", "Design", "Business", "Lifestyle", "Health", "Travel", "Education", "Other"],
        message: "Invalid category",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["Draft", "Published"],
        message: "Status must be Draft or Published",
      },
      default: "Draft",
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    tags: {
      type: [String],
      default: [],
    },
    thumbnailUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search performance
postSchema.index({ title: "text", author: "text", category: "text" });

module.exports = mongoose.model("Post", postSchema);
