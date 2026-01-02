import InfoTab from "./InfoTab";
import "../styles/SearchTab.scss";
import UserMiniProfile from "./UserMiniProfile";
import { getPopularTopics, getTrendingPeople } from "@/lib/db-queries";
import Link from "next/link";

export default async function SearchTab() {
  const [trendingPeople, popularTopics] = await Promise.all([
    getTrendingPeople(),
    getPopularTopics(),
  ]);
  return (
    <div className="search-tab-container">
      <input type="text" className="search-input" placeholder="Search..." />
      <InfoTab heading="Popular Topics">
        {popularTopics.length > 0 ? (
          popularTopics.map((topic: string) => (
            <Link href={"posts/" + topic} key={topic} className="topic-text">
              {topic}
            </Link>
          ))
        ) : (
          <p className="topic-text">No topics found</p>
        )}
      </InfoTab>
      <InfoTab heading="Trending People">
        {trendingPeople.length > 0 ? (
          trendingPeople.map((user) => (
            <UserMiniProfile
              key={user.sub || user._id.toString()}
              userData={user}
            />
          ))
        ) : (
          <p>No trending users found.</p>
        )}
      </InfoTab>
    </div>
  );
}
