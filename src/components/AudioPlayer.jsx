"use client";

import { useState } from "react";

export default function AudioPlayer({ text }) {
  const [loading, setLoading] = useState(false);

  async function play() {
    try {
      setLoading(true);

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        setLoading(false);
        alert("TTS failed");
        return;
      }

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);

      audio.onerror = () => {
        alert("Audio failed to play.");
      };

      audio.play();

    } catch (err) {
      console.error(err);
      alert("Audio playback error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={play}
      className="px-4 py-2 bg-purple-600 text-white rounded"
    >
      {loading ? "Loading..." : "Play Audio"}
    </button>
  );
}
