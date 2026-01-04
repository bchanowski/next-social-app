"use client";

import { use, useEffect, useState } from "react";
import { PostT } from "@/types/PostT";
import StarButton from "@/components/Icons/StarButton";
import BookmarkButton from "@/components/Icons/BookmarkIcon";
import Loader from "@/components/Shared/Loader";
import "./post.scss";

export default function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = use(params);
  const [postData, setPostData] = useState<PostT>({} as PostT);

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/` + postId)
        .then((res) => res.json())
        .then((data) => setPostData(data));
    }
  }, [postId]);

  const formattedDate = postData.createdAt
    ? new Date(postData.createdAt).toLocaleDateString("en-GB")
    : "";

  return (
    <div className="post-page-container">
      {!postData._id ? (
        <div className="post-loader-wrapper">
          <Loader size="large" />
        </div>
      ) : (
        <article className="post-card">
          <header className="post-header">
            <div className="post-meta-top">
              <span className="post-topic-badge">{postData.topic}</span>
              <time className="post-date">{formattedDate}</time>
            </div>
            <h1 className="post-title">{postData.title}</h1>
          </header>

          <section className="post-body">
            <p className="post-description">{postData.description}</p>
          </section>

          <footer className="post-actions-bar">
            <div className="action-group">
              <StarButton
                postId={String(postData._id)}
                stars={postData.stars}
              />

              <div className="action-divider"></div>

              <BookmarkButton postId={String(postData._id)} />
            </div>
          </footer>
        </article>
      )}
    </div>
  );
}
