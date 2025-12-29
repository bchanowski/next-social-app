import InfoTab from "./InfoTab";
import UserBlock from "./UserBlock";
import "../styles/UserTab.scss";
import Link from "next/link";

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
          <Link key={index} href={"/" + option.toLowerCase()} className="user-tab-option">
            {option}
          </Link>
        ))}
      </InfoTab>
      <a href="/auth/logout" className="logout-btn">
        Logout
      </a>
    </div>
  );
}
