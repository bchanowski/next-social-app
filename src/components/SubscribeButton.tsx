"use client";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Image from "next/image";
import subscribeIcon from "../../public/subscribe.svg";
import subscribedIcon from "../../public/subscribed.svg";

export default function SubscribeButton({
  targetId,
  initialIsSubscribed,
}: {
  targetId: string;
  initialIsSubscribed: boolean;
}) {
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSubscribed(initialIsSubscribed);
  }, [initialIsSubscribed]);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/subscribe", {
        method: "POST",
        body: JSON.stringify({ targetId }),
      });
      if (res.ok) {
        setIsSubscribed((prev) => !prev);
      }
    } catch (err) {
      console.error("Failed to toggle subscription", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={isSubscribed ? "btn-subscribed" : "btn-subscribe"}
    >
      {isSubscribed ? (
        <Image src={subscribedIcon} alt="Subscribed" width={24} height={24} />
      ) : (
        <Image src={subscribeIcon} alt="Subscribe" width={24} height={24} />
      )}
    </button>
  );
}
