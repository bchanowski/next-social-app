import { PostT } from "@/types/PostT";
import { UserT } from "@/types/UserT";
import "../styles/FeedPost.scss";
import { useEffect, useState } from "react";

type Props = {
  post: PostT;
};

export default function FeedPost({ post }: Props) {
  const postDate = new Date(post.createdAt);
  const [userData, setUserData] = useState<UserT>({} as UserT);

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
      <p className="feed-post-desc">{post.description}</p>
      <div className="feed-post-heading-div">
        <p>{userData?.name || "Loading..."}</p>
        <p>Show More...</p>
      </div>
    </div>
  );
}
