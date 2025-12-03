"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  text: string;
}

export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stop();
    };
  }, []);

  async function play() {
    if (playing) {
      pause();
      return;
    }

    setPlaying(true);

    // If we already have an audio element (server TTS), play it
    if (audioRef.current) {
      audioRef.current.play();
      return;
    }

    // If we have an utterance (browser TTS), resume or start it
    if (utteranceRef.current) {
      synthRef.current?.resume();
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = res.headers.get("Content-Type")?.includes("application/json")
        ? await res.json()
        : null;

      if (data?.useBrowserTTS) {
        // Fallback to Browser TTS
        console.log("Using Browser TTS");
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
          setPlaying(false);
          utteranceRef.current = null;
        };
        utteranceRef.current = utterance;
        synthRef.current?.speak(utterance);
      } else if (res.ok) {
        // Use Server TTS (Audio Blob)
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.onended = () => setPlaying(false);
        audio.onerror = () => {
          alert("Audio failed to play.");
          setPlaying(false);
        };

        audioRef.current = audio;
        audio.play();
      } else {
        throw new Error("TTS Request failed");
      }

    } catch (err) {
      console.error(err);
      alert("Audio playback error. Trying browser fallback.");
      // Last resort fallback
      const utterance = new SpeechSynthesisUtterance(text);
      synthRef.current?.speak(utterance);
    } finally {
      setLoading(false);
    }
  }

  function pause() {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (synthRef.current?.speaking) {
      synthRef.current.pause();
    }
    setPlaying(false);
  }

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
      utteranceRef.current = null;
    }
    setPlaying(false);
  }

  const [showScript, setShowScript] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={playing ? pause : play}
          disabled={loading}
          className="min-w-[100px]"
        >
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : playing ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Read Plan
            </>
          )}
        </Button>

        {playing && (
          <Button variant="ghost" size="icon" onClick={stop} title="Stop">
            <Square className="h-4 w-4 fill-current" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowScript(!showScript)}
          className="ml-auto text-xs text-muted-foreground"
        >
          {showScript ? "Hide Script" : "Show Script"}
        </Button>
      </div>

      {showScript && (
        <div className="mt-2 p-3 bg-muted/50 rounded-md text-sm text-muted-foreground max-h-40 overflow-y-auto border border-border/50">
          {text}
        </div>
      )}
    </div>
  );
}
