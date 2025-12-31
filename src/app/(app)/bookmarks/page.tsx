"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import PostsList from "@/components/PostsList";
import Loader from "@/components/Loader";
import { UserT } from "@/types/UserT";
import "./bookmarks.scss";

export default function BookmarksPage() {
  const { user, isLoading: authLoading } = useUser();
  const [userData, setUserData] = useState<UserT | null>(null);

  useEffect(() => {
    if (!user?.sub) return;

    fetch(`/api/users/${encodeURIComponent(user.sub)}`)
      .then((res) => res.json())
      .then((data: UserT) => setUserData(data))
      .catch((err) => console.error(err));
  }, [user?.sub]);

  if (authLoading || !userData) return <Loader size="large" fullPage />;

  const bookmarkIds = userData.bookmarkedPosts.map((id) => id.toString());

  return (
    <div className="bookmarks-container">
      <h1>My Bookmarks</h1>
      {bookmarkIds.length > 0 ? (
        <PostsList key="bookmarks-view" postIds={bookmarkIds} />
      ) : (
        <p>Your library is empty.</p>
      )}
    </div>
  );
}
