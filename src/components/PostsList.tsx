"use client";
import { useInfiniteFeed } from "@/lib/useInfiniteFeed";
import { useEffect, useRef } from "react";
import FeedPost from "./FeedPost";
import Loader from "./Loader";
import { PostT } from "@/types/PostT";
import "../styles/PostsList.scss";

interface PostsListProps {
  authorId?: string;
  postIds?: string[];
}

export default function PostsList({ authorId, postIds }: PostsListProps) {
  const { posts, load, hasMore, loading } = useInfiniteFeed(authorId, postIds);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) load();
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, load, loading]);

  return (
    <div className="all-posts-container">
      {posts.map((post: PostT) => (
        <FeedPost key={post._id.toString()} post={post} />
      ))}

      {loading && <Loader size="medium" />}

      {hasMore && <div ref={loaderRef} style={{ height: "20px" }} />}
      {!hasMore && posts.length > 0 && <p>No more posts found.</p>}
    </div>
  );
}
