"use client";
import AllPostsList from "@/components/AllPostsList";
import { useState } from "react";

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
    <div>
      <h2>Add Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {!confirming ? (
        <button onClick={() => setConfirming(true)}>Post</button>
      ) : (
        <>
          <p>Are you sure?</p>
          <button onClick={submit}>Yes</button>
          <button onClick={() => setConfirming(false)}>Cancel</button>
        </>
      )}
      <AllPostsList />
    </div>
  );
}
