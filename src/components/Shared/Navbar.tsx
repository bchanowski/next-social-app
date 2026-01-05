"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import "@/styles/Shared/Navbar.scss";
import Image from "next/image";
import Loader from "./Loader";

const navOptions = [
  "Home",
  "Explore",
  "Notifications",
  "Bookmarks",
  "Settings",
];

export default function Navbar() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mobile-navbar">
      <div className="navbar-content">
        <div
          className="nav-user-section"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {user?.picture ? (
            <Image
              alt="User's Avatar"
              src={user.picture}
              width={30}
              height={30}
              className="nav-avatar"
            />
          ) : (
            <Loader size="small" />
          )}
        </div>
        <div className="nav-search-section">
          <input
            type="text"
            placeholder="Search..."
            className="nav-search-input"
          />
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              {user ? (
                <Link
                  href={"/user/" + user.sub}
                  onClick={() => setIsMenuOpen(false)}
                  className="menu-user-name"
                >
                  <p>{user?.name || "User"}</p>
                </Link>
              ) : (
                <Loader size="small" />
              )}
            </div>
            <div className="menu-links">
              {navOptions.map((opt) => (
                <Link
                  key={opt}
                  href={`/${opt.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {opt}
                </Link>
              ))}
              <div className="menu-divider" />
              <a href="/auth/logout" className="menu-logout">
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
