"use client";
import Image from "next/image";
import starIcon from "../../../public/star.svg";
import { useEffect, useState } from "react";

interface Props {
  size?: "small" | "large";
  postId: string;
  stars: number;
}

export default function StarButton({ size = "small", postId, stars }: Props) {
  const [isStarred, setIsStarred] = useState(false);
  const [starValue, setStarValue] = useState(stars);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;

    async function fetchBookmarkStatus() {
      const res = await fetch(`/api/posts/bookmark/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setIsStarred(data.isStarred);
      }
    }
    fetchBookmarkStatus();
  }, [postId]);

  const toggleStar = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/star/${postId}`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setIsStarred(data.isStarred);
        setStarValue((prev) => (data.isStarred ? prev + 1 : prev - 1));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={toggleStar}
      style={{ cursor: "pointer", display: "flex", flexDirection: "row" }}
    >
      <Image src={starIcon} alt="Star" width={30} height={30} />
      <span style={{ color: "black", fontSize: "24px" }}>{starValue}</span>
    </div>
  );
}
