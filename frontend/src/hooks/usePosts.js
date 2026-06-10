import { useState, useEffect, useCallback } from "react";
import { postService } from "../services/postService";

export const usePosts = (initialParams = {}) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ page: 1, limit: 10, ...initialParams });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await postService.getAll(params);
      setPosts(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  return { posts, pagination, loading, error, params, updateParams, refetch: fetchPosts };
};
