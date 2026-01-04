import SearchTab from "@/components/SearchTab/SearchTab";
import UserTab from "@/components/UserTab/UserTab";
import Navbar from "@/components/Shared/Navbar";
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
      <Navbar />
      <UserTab />
      <div className="vertical-line" />
      {children}
      <div className="vertical-line" />
      <SearchTab />
    </div>
  );
}
