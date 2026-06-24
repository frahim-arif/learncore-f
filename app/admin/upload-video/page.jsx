"use client";

import { useState } from "react";

export default function UploadVideoPage() {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleUpload = async () => {
    if (!title || !video) {
      setMsg("Please enter title & select video!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/admin/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMsg("Video uploaded successfully!");
      } else {
        setMsg(data.message || "Upload failed");
      }
    } catch (error) {
      setLoading(false);
      setMsg("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>

      {msg && <p className="mb-4 text-blue-600">{msg}</p>}

      <label className="block mb-2 font-semibold">Video Title</label>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label className="block mb-2 font-semibold">Select Video</label>
      <input
        type="file"
        accept="video/*"
        className="w-full mb-4"
        onChange={(e) => setVideo(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
}
