import SearchTab from "@/components/SearchTab";
import UserTab from "@/components/UserTab";
import { ensureUser } from "@/lib/ensureUser";
import "./layout.scss";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await ensureUser();
  return (
    <div className="home-layout-container">
      <UserTab />
      <div className="vertical-line" />
      {children}
      <div className="vertical-line" />
      <SearchTab />
    </div>
  );
}
