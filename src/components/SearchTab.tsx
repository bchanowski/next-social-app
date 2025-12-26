import InfoTab from "./InfoTab";
import "../styles/SearchTab.scss";
import Image from "next/image";
import { auth0 } from "@/lib/auth0";
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
          <div key={topic} className="trend-people-container">
            {user?.picture ? (
              <Image
                alt="User's Avatar"
                src={user.picture}
                width={30}
                height={30}
                className="popular-user-img"
              />
            ) : (
              <></>
            )}
            <div className="trend-people-text">
              <p>Dummy User</p>
              <p>Engineer</p>
            </div>
          </div>
        ))}
      </InfoTab>
    </div>
  );
}
