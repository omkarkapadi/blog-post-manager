const { body, validationResult } = require("express-validator");

const validatePost = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters")
    .isLength({ max: 200 }).withMessage("Title cannot exceed 200 characters"),

  body("author")
    .trim()
    .notEmpty().withMessage("Author name is required")
    .isLength({ min: 2 }).withMessage("Author name must be at least 2 characters"),

  body("authorEmail")
    .trim()
    .notEmpty().withMessage("Author email is required")
    .isEmail().withMessage("Please enter a valid email address"),

  body("category")
    .notEmpty().withMessage("Category is required")
    .isIn(["Technology", "Design", "Business", "Lifestyle", "Health", "Travel", "Education", "Other"])
    .withMessage("Invalid category"),

  body("status")
    .optional()
    .isIn(["Draft", "Published"]).withMessage("Status must be Draft or Published"),

  body("shortDescription")
    .trim()
    .notEmpty().withMessage("Short description is required")
    .isLength({ max: 500 }).withMessage("Short description cannot exceed 500 characters"),

  body("content")
    .trim()
    .notEmpty().withMessage("Post content is required")
    .isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }
    next();
  },
];

module.exports = { validatePost };
