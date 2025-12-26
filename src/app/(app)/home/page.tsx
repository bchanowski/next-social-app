"use client";
import AllPostsList from "@/components/AllPostsList";
import { useState } from "react";
import "./home.scss";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [confirming, setConfirming] = useState(false);

  async function submit() {
    await fetch("/api/posts", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    setConfirming(false);
  }
  return (
    <div className="home-page-container">
      <label className="add-post-container">
        Add Post
        <input
          className="add-post-title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="add-post-desc"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={() => setConfirming(true)} className="add-post-btn">
          Post
        </button>
        {!confirming ? (
          <></>
        ) : (
          <div className="modal-container">
            <div className="confirm-modal">
              <h2>Are you sure want to add the post?</h2>
              <div className="confirm-buttons-container">
                <button onClick={submit} className="confirm-btn">
                  Yes
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </label>
      <div className="feed-option-div">
        <p>Home</p>|<p>Explore</p>
      </div>
      <AllPostsList />
    </div>
  );
}
