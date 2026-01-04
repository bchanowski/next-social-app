"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { User } from "@auth0/nextjs-auth0/types";
import "@/styles/Settings/UserSettingsForm.scss";

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
    <div className="form-container">
      <h2 className="settings-subtitle">User Profile</h2>
      <form className="settings-form" onSubmit={handleSave}>
        <div className="input-group">
          <label className="input-label">Name</label>
          <input
            className="input-field"
            type="text"
            name="name"
            defaultValue={userData.name || ""}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Position</label>
          <input
            className="input-field"
            type="text"
            name="position"
            defaultValue={userData.position || ""}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Summary</label>
          <input
            className="input-field"
            type="text"
            name="description"
            defaultValue={userData.description || ""}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Photo (URL)</label>
          <input
            className="input-field"
            type="text"
            name="avatarUrl"
            defaultValue={userData.avatarUrl || ""}
          />
        </div>

        <div className="form-actions">
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
