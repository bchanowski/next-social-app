import { PostT } from "@/types/PostT";
import "../styles/FeedPost.scss";

type Props = {
  post: PostT;
};

export default function FeedPost({ post }: Props) {
  return (
    <div className="feed-post-container">
      <div className="feed-post-heading-div">
        <h3>{post.title}</h3>
        <p>{post.createdAt.toString()}</p>
      </div>
      <p className="feed-post-desc">{post.description}</p>
      <div className="feed-post-heading-div">
        <p>{post.authorId}</p>
        <p>Show More...</p>
      </div>
    </div>
  );
}
