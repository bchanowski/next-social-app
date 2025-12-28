"use client";
import { PostT } from "@/types/PostT";
import { useEffect, useState, useRef, useCallback } from "react";

export function useInfiniteFeed() {
  const [posts, setPosts] = useState<PostT[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const isInitialMount = useRef(true);

  const load = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/feed${cursor ? `?cursor=${cursor}` : ""}`);
      const data = await res.json();

      setPosts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        const unique = data.posts.filter((post: PostT) => !ids.has(post._id));
        return [...prev, ...unique];
      });
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : "Fetch failed");
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      load();
    }
  }, [load]);

  return { posts, load, hasMore, loading };
}
