import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar__inner">
      <NavLink to="/" className="navbar__brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        BlogManager
      </NavLink>
      <div style={{ display: "flex", gap: ".25rem" }}>
        <NavLink to="/" end className="navbar__link">Posts</NavLink>
        <NavLink to="/posts/new" className="navbar__link">New Post</NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
