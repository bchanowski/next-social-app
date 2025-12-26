import InfoTab from "./InfoTab";
import UserBlock from "./UserBlock";
import "../styles/UserTab.scss";

const userTabOptions = [
  "Home",
  "Explore",
  "Notifications",
  "Bookmarks",
  "Starred",
  "Settings",
];

export default async function UserTab() {
  return (
    <div className="user-tab-container">
      <UserBlock />
      <InfoTab heading="Home Tab">
        {userTabOptions.map((option, index) => (
          <a key={index} href={"/" + option} className="user-tab-option">
            {option}
          </a>
        ))}
      </InfoTab>
      <a href="/auth/logout" className="logout-btn">
        Logout
      </a>
    </div>
  );
}
