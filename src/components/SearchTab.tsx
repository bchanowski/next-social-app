import InfoTab from "./InfoTab";
import "../styles/SearchTab.scss";
import { auth0 } from "@/lib/auth0";
import UserMiniProfile from "./UserMiniProfile";
const popularTopics = ["React", "Python", "Nextjs", "C++", "AI"];

export default async function SearchTab() {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <div className="search-tab-container">
      <input type="text" className="search-input" placeholder="Search..." />
      <InfoTab heading="Popular Topics">
        {popularTopics.map((topic, index) => (
          <p key={index} className="topic-text">
            {topic}
          </p>
        ))}
      </InfoTab>
      <InfoTab heading="Trending People">
        {popularTopics.map((topic) => (
          <UserMiniProfile key={topic} userData={user} />
        ))}
      </InfoTab>
    </div>
  );
}
