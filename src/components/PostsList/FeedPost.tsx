"use client";
import { PostT } from "@/types/PostT";
import { useEffect, useState } from "react";
import UserMiniProfile from "../Shared/UserMiniProfile";
import { User } from "@auth0/nextjs-auth0/types";
import Link from "next/link";
import "@/styles/PostsList/FeedPost.scss";

type Props = {
  post: PostT;
};

export default function FeedPost({ post }: Props) {
  const [userData, setUserData] = useState<User>({} as User);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${post.authorId}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    if (post.authorId) fetchUser();
  }, [post.authorId]);

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="feed-post-card">
      <div className="feed-post-header">
        <div className="title-area">
          <h3 className="post-title">{post.title}</h3>
          <span className="post-date">{formattedDate}</span>
        </div>
      </div>

      <div className="feed-post-body">
        <p className="post-description">{post.description}</p>
      </div>

      <div className="feed-post-footer">
        <div className="user-section">
          {userData.name ? (
            <UserMiniProfile userData={userData} />
          ) : (
            <div className="user-loader-placeholder" />
          )}
        </div>

        <Link href={`/post/${post._id}`} className="btn-show-post">
          Show Post
        </Link>
      </div>
    </div>
  );
}
