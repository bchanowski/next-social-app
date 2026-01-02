"use client";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import "../styles/AddPost.scss";

export default function AddPost() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    desc: false,
    topic: false,
  });
  const topicOptions = [
    "General",
    "React",
    "Python",
    "JavaScript",
    "Java",
    "AI",
    "Testing",
    "C++",
    "C#",
    "Nextjs",
  ];

  const handlePostAttempt = () => {
    const titleEmpty = !title.trim();
    const descEmpty = !description.trim();
    const topicEmpty = !topic.trim();

    setErrors({ title: titleEmpty, desc: descEmpty, topic: topicEmpty });

    if (titleEmpty || descEmpty || topicEmpty) return;
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
      body: JSON.stringify({ title, description, topic }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setTopic("");
      setConfirming(false);
    }
  }
  return (
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
      <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        {topicOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
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
  );
}
