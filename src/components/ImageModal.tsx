"use client";

import { useEffect, useState } from "react";

interface ImageModalProps {
  prompt: string;
  onClose: () => void;
}

export default function ImageModal({ prompt, onClose }: ImageModalProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generate() {
      setLoading(true);

      try {
        const res = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        setImgUrl(data.url);
      } catch (e) {
        console.error(e);
        alert("Failed to generate image");
      }

      setLoading(false);
    }

    generate();
  }, [prompt]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md w-full relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black dark:text-white"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-3">
          Image for: {prompt}
        </h3>

        {loading && <p>Generating image…</p>}

        {!loading && imgUrl && (
          <img
            src={imgUrl}
            alt={prompt}
            className="rounded w-full"
          />
        )}

        {!loading && !imgUrl && (
          <p className="text-red-500">Image could not be generated.</p>
        )}
      </div>
    </div>
  );
}
