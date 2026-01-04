import PostsList from "@/components/PostsList/PostsList";
import "./topic.scss";
export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  let decodedTopic = decodeURIComponent(topic);
  decodedTopic = decodedTopic.charAt(0).toUpperCase() + decodedTopic.slice(1);

  return (
    <div className="topic-page-container">
      <header className="topic-header" style={{ padding: "20px 0" }}>
        <h1>Posts about {decodedTopic}</h1>
      </header>
      <PostsList topic={decodedTopic} />
    </div>
  );
}
