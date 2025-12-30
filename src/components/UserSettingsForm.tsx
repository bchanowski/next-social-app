"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { User } from "@auth0/nextjs-auth0/types";

export default function UserSettingsForm() {
  const { user } = useUser();
  const [userData, setUserData] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/users/email`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [user?.email]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      position: formData.get("position"),
      description: formData.get("description"),
      avatarUrl: formData.get("avatarUrl"),
    };

    try {
      const res = await fetch("/api/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        alert("Profile updated!");
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="settings-container">
      <h2>User Settings</h2>

      <form onSubmit={handleSave}>
        <label>
          Name
          <input type="text" name="name" defaultValue={userData.name || ""} />
        </label>

        <label>
          Position
          <input
            type="text"
            name="position"
            defaultValue={userData.position || ""}
          />
        </label>

        <label>
          Summary
          <input
            type="text"
            name="description"
            defaultValue={userData.description || ""}
          />
        </label>

        <label>
          Photo (URL)
          <input
            type="text"
            name="avatarUrl"
            defaultValue={userData.avatarUrl || ""}
          />
        </label>

        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
