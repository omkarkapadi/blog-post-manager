import * as yup from "yup";

export const postSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),

  author: yup
    .string()
    .required("Author name is required")
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name cannot exceed 100 characters"),

  authorEmail: yup
    .string()
    .required("Author email is required")
    .email("Please enter a valid email address"),

  category: yup
    .string()
    .required("Category is required")
    .oneOf(
      ["Technology", "Design", "Business", "Lifestyle", "Health", "Travel", "Education", "Other"],
      "Please select a valid category"
    ),

  status: yup
    .string()
    .oneOf(["Draft", "Published"], "Status must be Draft or Published"),

  shortDescription: yup
    .string()
    .required("Short description is required")
    .max(500, "Short description cannot exceed 500 characters"),

  content: yup
    .string()
    .required("Post content is required")
    .min(10, "Content must be at least 10 characters"),

  tags: yup.string(),

  thumbnailUrl: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => value || null),
});

export const CATEGORIES = [
  "Technology",
  "Design",
  "Business",
  "Lifestyle",
  "Health",
  "Travel",
  "Education",
  "Other",
];

export const STATUSES = ["Draft", "Published"];
