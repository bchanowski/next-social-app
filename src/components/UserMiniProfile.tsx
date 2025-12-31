"use client";
import "../styles/UserMiniProfile.scss";
import Image from "next/image";
import { User } from "@auth0/nextjs-auth0/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import SubscribeButton from "./SubscribeButton";

type Props = {
  userData: User | undefined;
};

export default function UserMiniProfile({ userData }: Props) {
  const { user } = useUser();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  useEffect(() => {
    if (userData?.auth0Id && userData?.auth0Id !== user?.sub) {
      fetch(`/api/users/subscribe/status/${userData.auth0Id}`)
        .then((res) => res.json())
        .then((data) => setIsSubscribed(data.isSubscribed));
    }
  }, [userData, user?.sub]);
  return (
    <>
      <Link className="user-mini-container" href={"/user/" + userData?.auth0Id}>
        {userData?.picture || userData?.avatarUrl ? (
          <Image
            alt="User's Avatar"
            src={userData?.avatarUrl}
            width={30}
            height={30}
            className="user-mini-img"
          />
        ) : (
          <></>
        )}
        <div className="user-mini-text">
          <p>{userData?.name}</p>
          <p>{userData?.position ? userData?.position : "No position"}</p>
        </div>
      </Link>
      {userData?.auth0Id && userData?.auth0Id !== user?.sub && (
        <SubscribeButton
          targetId={userData.auth0Id}
          initialIsSubscribed={isSubscribed ?? false}
        />
      )}
    </>
  );
}
