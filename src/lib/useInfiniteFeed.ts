"use client";
import { PostT } from "@/types/PostT";
import { useEffect, useState, useCallback } from "react";

export function useInfiniteFeed(authorId?: string | string[]) {
  const [posts, setPosts] = useState<PostT[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const idString = Array.isArray(authorId) ? authorId.join(",") : authorId;
  useEffect(() => {
    setPosts([]);
    setCursor(null);
    setHasMore(true);
  }, [idString]);

  const load = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cursor) params.append("cursor", cursor);
      if (idString) params.append("authorId", idString);
      const url = `/api/feed?${params.toString()}`;
      console.log("Fetching URL:", url);
      const res = await fetch(url);
      const data = await res.json();

      setPosts((prev) => {
        if (!cursor) return data.posts;

        const ids = new Set(prev.map((p) => p._id));
        const unique = data.posts.filter((post: PostT) => !ids.has(post._id));
        return [...prev, ...unique];
      });

      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, idString, loading]);

  useEffect(() => {
    if (posts.length === 0 && hasMore && !loading) {
      load();
    }
  }, [load, posts.length, hasMore, loading]);

  return { posts, load, hasMore, loading };
}
