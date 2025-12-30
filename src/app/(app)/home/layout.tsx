"use client";
import Link from "next/link";
import "./home.scss";
import AddPost from "@/components/AddPost";
import { useState } from "react";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [feedOption, setFeedOption] = useState<"Home" | "Explore">("Home");
  return (
    <div className="home-page-container">
      <AddPost />
      <div className="feed-option-div">
        <Link
          href="/home"
          className={
            "feed-option-text" +
            (feedOption === "Home" ? " feed-option-selected" : "")
          }
          onClick={() => setFeedOption("Home")}
          aria-disabled={feedOption === "Home"}
        >
          Home
        </Link>
        |
        <Link
          href="/home/explore"
          className={
            "feed-option-text" +
            (feedOption === "Explore" ? " feed-option-selected" : "")
          }
          onClick={() => setFeedOption("Explore")}
          aria-disabled={feedOption === "Explore"}
        >
          Explore
        </Link>
      </div>
      {children}
    </div>
  );
}
