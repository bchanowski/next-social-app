import InfoTab from "./InfoTab";
import UserBlock from "./UserBlock";

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
    <div>
      <UserBlock />
      <InfoTab heading="Home Tab">
        {userTabOptions.map((option, index) => (
          <a key={index} href={"/" + option}>
            {option}
          </a>
        ))}
      </InfoTab>
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
