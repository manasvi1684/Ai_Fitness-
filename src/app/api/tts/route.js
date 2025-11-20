import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { text } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Generate audio using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts", 
      voice: "alloy",            // choose: alloy, verse, shimmer
      input: text,
      format: "mp3",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (err) {
    console.error("TTS ERROR:", err);
    return NextResponse.json(
      { error: "OpenAI TTS failed" },
      { status: 500 }
    );
  }
}
