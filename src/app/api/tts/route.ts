import { NextResponse } from "next/server";
import { generateSpeech } from "@/lib/tts/elevenlabs";

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // Check for Stub Mode or Missing Key
        if (!process.env.ELEVENLABS_API_KEY || process.env.NEXT_PUBLIC_TTS_STUB === "true") {
            console.log("TTS Stub Mode: Returning signal to use browser TTS");
            return NextResponse.json({ useBrowserTTS: true });
        }

        const audioBuffer = await generateSpeech(text);

        return new NextResponse(audioBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": audioBuffer.byteLength.toString(),
            },
        });
    } catch (err) {
        console.error("TTS API Error:", err);
        // Fallback to browser TTS on error
        return NextResponse.json({ useBrowserTTS: true });
    }
}
