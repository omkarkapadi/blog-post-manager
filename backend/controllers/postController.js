const Post = require("../models/Post");
const { Parser } = require("json2csv");

// @desc    Get all posts with pagination and filters
// @route   GET /api/posts
const getAllPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category = "",
      status = "",
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = buildFilter({ search, category, status });

    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Post.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalRecords: total,
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
const createPost = async (req, res, next) => {
  try {
    const { tags, ...rest } = req.body;
    const parsedTags =
      typeof tags === "string"
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : tags || [];

    const post = await Post.create({ ...rest, tags: parsedTags });
    res.status(201).json({ success: true, data: post, message: "Post created successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
const updatePost = async (req, res, next) => {
  try {
    const { tags, ...rest } = req.body;
    const parsedTags =
      typeof tags === "string"
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : tags || [];

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...rest, tags: parsedTags },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, data: post, message: "Post updated successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Search posts by title, author, or category
// @route   GET /api/posts/search
const searchPosts = async (req, res, next) => {
  try {
    const { q = "", category = "", status = "", page = 1, limit = 10 } = req.query;

    if (!q && !category && !status) {
      return res.status(400).json({ success: false, message: "Provide at least one search parameter" });
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = buildFilter({ search: q, category, status });

    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Post.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalRecords: total,
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export posts to CSV
// @route   GET /api/posts/export/csv
const exportToCSV = async (req, res, next) => {
  try {
    const { search = "", category = "", status = "" } = req.query;
    const filter = buildFilter({ search, category, status });

    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: "No posts found to export" });
    }

    const fields = [
      { label: "ID", value: "_id" },
      { label: "Title", value: "title" },
      { label: "Author", value: "author" },
      { label: "Author Email", value: "authorEmail" },
      { label: "Category", value: "category" },
      { label: "Status", value: "status" },
      { label: "Short Description", value: "shortDescription" },
      { label: "Tags", value: (row) => row.tags.join(", ") },
      { label: "Created At", value: (row) => new Date(row.createdAt).toLocaleDateString() },
      { label: "Updated At", value: (row) => new Date(row.updatedAt).toLocaleDateString() },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(posts);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="blog-posts-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

// Helper: build MongoDB filter object
const buildFilter = ({ search, category, status }) => {
  const filter = {};

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [{ title: regex }, { author: regex }, { category: regex }];
  }

  if (category) filter.category = category;
  if (status) filter.status = status;

  return filter;
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost, searchPosts, exportToCSV };
