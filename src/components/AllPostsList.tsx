"use client";
import { useInfiniteFeed } from "@/lib/useInfiniteFeed";
import { useEffect, useRef } from "react";

export default function AllPostsList() {
  const { posts, load, hasMore, loading } = useInfiniteFeed();
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) load();
    });

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div>
      {posts.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}

      {loading && <p>Loading…</p>}
      {!hasMore && <p>No more posts to show.</p>}

      <div ref={loader} style={{ height: 1 }} />
    </div>
  );
}
