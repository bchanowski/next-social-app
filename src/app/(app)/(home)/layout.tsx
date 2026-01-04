"use client";
import "./home.scss";
import AddPost from "@/components/Home/AddPost";
import TabSwitcher from "@/components/Shared/TabSwitcher";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="home-page-container">
      <AddPost />
      <TabSwitcher optionOne="Home" optionTwo="Explore" />

      {children}
    </div>
  );
}
