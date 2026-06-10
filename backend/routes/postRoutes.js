const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  exportToCSV,
} = require("../controllers/postController");
const { validatePost } = require("../middleware/validatePost");

// Special routes MUST come before :id routes
router.get("/search", searchPosts);
router.get("/export/csv", exportToCSV);

// CRUD routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", validatePost, createPost);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", deletePost);

module.exports = router;
