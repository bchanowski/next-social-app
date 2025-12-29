import { PostT } from "@/types/PostT";
import "../styles/FeedPost.scss";
import { useEffect, useState } from "react";
import UserMiniProfile from "./UserMiniProfile";
import { User } from "@auth0/nextjs-auth0/types";
import Link from "next/link";

type Props = {
  post: PostT;
};

export default function FeedPost({ post }: Props) {
  const postDate = new Date(post.createdAt);
  const [userData, setUserData] = useState<User>({} as User);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${post.authorId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    if (post.authorId) {
      fetchUser();
    }
  }, [post.authorId]);
  return (
    <div className="feed-post-container">
      <div className="feed-post-heading-div">
        <h3>{post.title}</h3>
        <p>
          {postDate.getDate()}-{postDate.getMonth()}-{postDate.getFullYear()}
        </p>
      </div>
      <div className="feed-post-desc">{post.description}</div>
      <div className="feed-post-heading-div">
        <div>
          {userData ? <UserMiniProfile user={userData} /> : <>Loading...</>}
        </div>
        <Link className="show-post-text" href={"/post/" + post._id}>
          Show Post
        </Link>
      </div>
    </div>
  );
}
