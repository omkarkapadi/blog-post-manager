import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export const postService = {
  getAll: (params) => api.get("/posts", { params }),

  getById: (id) => api.get(`/posts/${id}`),

  create: (data) => api.post("/posts", data),

  update: (id, data) => api.put(`/posts/${id}`, data),

  remove: (id) => api.delete(`/posts/${id}`),

  search: (params) => api.get("/posts/search", { params }),

  exportCSV: (params) => {
    const query = new URLSearchParams(params).toString();
    window.open(`${API_BASE}/posts/export/csv?${query}`, "_blank");
  },
};
