"use client";
import { PostT } from "@/types/PostT";
import { useEffect, useState } from "react";

export function useInfiniteFeed() {
  const [posts, setPosts] = useState<PostT[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  async function load() {
    if (!hasMore || loading) return;

    setLoading(true);

    const res = await fetch(`/api/feed${cursor ? `?cursor=${cursor}` : ""}`);
    const data = await res.json();

    setPosts((prev) => {
      const ids = new Set(prev.map((p) => p._id));
      const unique = data.posts.filter((post: PostT) => !ids.has(post._id));
      return [...prev, ...unique];
    });
    setCursor(data.nextCursor);
    setHasMore(data.hasMore);
    setLoading(false);
  }

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    load();
  }, [initialized]);

  return { posts, load, hasMore, loading };
}
