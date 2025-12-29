"use client";
import Image from "next/image";
import Link from "next/link";
import "../styles/UserBlock.scss";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { UserT } from "@/types/UserT";

export default function UserBlock() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserT>({} as UserT);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/users/email`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [user?.email]);
  return (
    <Link href={"/user/" + userData.auth0Id} className="user-block-container">
      {userData?.avatarUrl ? (
        <Image
          src={userData.avatarUrl}
          alt="User's Avatar"
          width={60}
          height={60}
          className="user-image"
        />
      ) : (
        "no photo"
      )}
      <div>
        <h3 className="user-block-text">{userData?.name}</h3>
        <p className="user-block-text">
          {userData.position ? userData.position : "No position"}
        </p>
      </div>
    </Link>
  );
}
