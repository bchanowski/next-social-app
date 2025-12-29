"use client";
import PostsList from "@/components/PostsList";
import { useState } from "react";
import "./home.scss";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [errors, setErrors] = useState({ title: false, desc: false });

  const handlePostAttempt = () => {
    const titleEmpty = !title.trim();
    const descEmpty = !description.trim();

    setErrors({ title: titleEmpty, desc: descEmpty });

    if (titleEmpty || descEmpty) return;
    if (user && !user.email_verified) {
      setNeedsVerification(true);
    } else {
      setConfirming(true);
    }
  };

  async function submit() {
    const res = await fetch("/api/posts", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setConfirming(false);
    }
  }
  return (
    <div className="home-page-container">
      <label className="add-post-container">
        Add Post
        <input
          className="add-post-title"
          type="text"
          placeholder="Title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="add-post-desc"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.title && (
          <span className="error-text">Title cannot be empty</span>
        )}
        {errors.desc && (
          <span className="error-text">Description cannot be empty</span>
        )}
        <button onClick={() => handlePostAttempt()} className="add-post-btn">
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
        {needsVerification && (
          <div className="modal-container">
            <div className="confirm-modal">
              <h2>Email Verification Required</h2>
              <p style={{ marginBottom: "20px" }}>
                You must verify your email address before you can create a post.
                Please check your inbox.
              </p>
              <div className="confirm-buttons-container">
                <button
                  onClick={() => setNeedsVerification(false)}
                  className="confirm-btn"
                  style={{ width: "100%" }}
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}
      </label>
      <div className="feed-option-div">
        <p>Home</p>|<p>Explore</p>
      </div>
      <PostsList />
    </div>
  );
}
