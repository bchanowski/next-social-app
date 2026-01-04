"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bookmarkIcon from "../../../public/book.svg";
import bookmarkedIcon from "../../../public/bookmarked.svg";

export default function BookmarkButton({ postId }: { postId: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;

    async function fetchBookmarkStatus() {
      const res = await fetch(`/api/posts/bookmark/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    }
    fetchBookmarkStatus();
  }, [postId]);

  const toggleBookmark = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/bookmark/${postId}`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={toggleBookmark} style={{ cursor: "pointer" }}>
      <Image
        src={isBookmarked ? bookmarkedIcon : bookmarkIcon}
        alt="Bookmark"
        width={30}
        height={30}
      />
    </div>
  );
}
