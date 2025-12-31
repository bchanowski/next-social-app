"use client";

import PostsList from "@/components/PostsList";
import { UserT } from "@/types/UserT";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import "./userPage.scss";

export default function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const [userData, setUserData] = useState<UserT>({} as UserT);

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/` + userId)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [userId]);
  return (
    <div className="user-page-container">
      <div className="user-page-info-div">
        {userData?.avatarUrl && (
          <Image
            src={userData.avatarUrl}
            alt="User's Avatar"
            width={60}
            height={60}
            className="user-page-image"
          />
        )}

        <div className="user-page-data">
          <p>{userData.name}</p>
          <p>{userData.position || "No position"}</p>
          <p>{userData.description || "No description provided"}</p>
        </div>
      </div>
      <h3>Posts</h3>
      <PostsList
        key={`profile-${userData.auth0Id}`}
        authorId={userData.auth0Id}
      />
    </div>
  );
}
