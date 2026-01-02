import { useState, useEffect, useCallback, useRef } from "react";
import { PostT } from "@/types/PostT";

export function useInfiniteFeed(
  authorId?: string,
  postIds?: string[],
  topic?: string
) {
  const [posts, setPosts] = useState<PostT[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const postIdsStr = postIds?.join(",");
  const currentMode = useRef<"bookmarks" | "profile" | "topic" | "global">(
    "global"
  );

  if (postIds !== undefined) currentMode.current = "bookmarks";
  else if (authorId !== undefined) currentMode.current = "profile";
  else if (topic !== undefined) currentMode.current = "topic";
  else currentMode.current = "global";

  useEffect(() => {
    setPosts([]);
    setCursor(null);
    setHasMore(true);
    setLoading(false);
  }, [authorId, postIdsStr, topic]);

  const load = useCallback(async () => {
    if (loading || !hasMore) return;

    if (
      currentMode.current === "profile" &&
      (!authorId || authorId === "undefined")
    ) {
      return;
    }

    setLoading(true);

    const endpoint =
      currentMode.current === "bookmarks" ? "/api/feed/posts" : "/api/feed";
    const params = new URLSearchParams();

    if (cursor) params.append("cursor", cursor);

    if (currentMode.current === "bookmarks") {
      params.append("ids", postIdsStr || "");
    } else if (currentMode.current === "profile" && authorId) {
      params.append("authorId", authorId);
    } else if (currentMode.current === "topic" && topic) {
      params.append("topic", topic);
    }

    try {
      const res = await fetch(`${endpoint}?${params.toString()}`);
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setPosts((prev) => (cursor ? [...prev, ...data.posts] : data.posts));
      setCursor(data.nextCursor || null);
      setHasMore(data.hasMore || false);
    } catch (e) {
      console.error("Feed load error:", e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading, authorId, postIdsStr, topic]);

  useEffect(() => {
    if (posts.length === 0 && hasMore && !loading) {
      load();
    }
  }, [posts.length, hasMore, loading, load]);

  return { posts, load, hasMore, loading };
}
