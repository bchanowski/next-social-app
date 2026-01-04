"use client";

import PostsList from "@/components/PostsList/PostsList";
import { UserT } from "@/types/UserT";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import "./userPage.scss";
import { useUser } from "@auth0/nextjs-auth0";
import Loader from "@/components/Shared/Loader";
import TabSwitcher from "@/components/Shared/TabSwitcher";

export default function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { isLoading: authLoading } = useUser();
  const { userId } = use(params);
  const [userData, setUserData] = useState<UserT | null>(null);
  const [feedOption, setFeedOption] = useState<"Posts" | "Starred">("Posts");

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data: UserT) => setUserData(data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, [userId]);

  if (authLoading || !userData) return <Loader size="large" fullPage />;

  const starIds = userData.starredPosts?.map((id) => id.toString()) || [];

  return (
    <div className="user-page-container">
      <div className="user-page-info-div">
        {userData.avatarUrl && (
          <Image
            src={userData.avatarUrl}
            alt="User's Avatar"
            width={60}
            height={60}
            className="user-page-image"
          />
        )}

        <div className="user-page-data">
          <p className="user-name">{userData.name}</p>

          <p className="user-position">{userData.position || "No position"}</p>

          <p className="user-description">
            {userData.description || "No description provided"}
          </p>
        </div>
      </div>
      <TabSwitcher
        optionOne="Posts"
        optionTwo="Starred"
        activeTab={feedOption}
        onTabChange={setFeedOption}
      />

      {feedOption === "Posts" ? (
        <PostsList
          key={`posts-${userData.auth0Id}`}
          authorId={userData.auth0Id}
        />
      ) : (
        <PostsList key={`starred-${userData.auth0Id}`} postIds={starIds} />
      )}

      {feedOption === "Starred" && starIds.length === 0 && (
        <p className="empty-msg">This user hasnt starred any posts yet.</p>
      )}
    </div>
  );
}
