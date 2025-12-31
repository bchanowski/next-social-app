"use client";

import { use, useEffect, useState } from "react";
import { PostT } from "@/types/PostT";
import "./post.scss";
import StarButton from "@/components/StarButton";
import BookmarkButton from "@/components/BookmarkIcon";
import Loader from "@/components/Loader";

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
  return (
    <div className="post-container">
      <div>
        <p>{postData.title}</p>
        <p>
          {new Date(postData.createdAt).getDate() +
            "-" +
            new Date(postData.createdAt).getMonth() +
            "-" +
            new Date(postData.createdAt).getFullYear()}
        </p>
        <p>{postData.description}</p>
        {postData._id ? (
          <>
            <StarButton postId={String(postData._id)} stars={postData.stars} />
            <BookmarkButton postId={String(postData._id)} />
          </>
        ) : (
          <Loader size="small" />
        )}
      </div>
    </div>
  );
}
