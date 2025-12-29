"use client";
import { useInfiniteFeed } from "@/lib/useInfiniteFeed";
import { useEffect, useRef } from "react";
import "../styles/AllPostsList.scss";
import FeedPost from "./FeedPost";
import Loader from "./Loader";

export default function PostsList({ userId }: { userId?: string }) {
  const { posts, load, hasMore, loading } = useInfiniteFeed(
    userId ? userId : undefined
  );
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) load();
    });

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore, load]);

  return (
    <div className="all-posts-container">
      {posts.map((p) => (
        <FeedPost post={p} key={p._id.toString()} />
      ))}

      {loading && <Loader size="medium" />}
      {!hasMore && <p>No more posts to show.</p>}

      <div ref={loader} style={{ height: 1 }} />
    </div>
  );
}
