import React from "react";

const categoryColorMap = {
  Technology: "tech",
  Design: "design",
  Business: "business",
};

export const StatusBadge = ({ status }) => (
  <span className={`badge badge--${status?.toLowerCase()}`}>{status}</span>
);

export const CategoryBadge = ({ category }) => {
  const variant = categoryColorMap[category] || "default";
  return <span className={`badge badge--${variant}`}>{category}</span>;
};
