import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/common/Navbar";
import PostListPage from "./pages/PostListPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import ViewPostPage from "./pages/ViewPostPage";
import "./styles/global.css";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/posts/new" element={<AddPostPage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          fontSize: ".875rem",
          borderRadius: "8px",
          boxShadow: "0 4px 16px rgba(0,0,0,.12)",
        },
        success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
      }}
    />
  </BrowserRouter>
);

export default App;
