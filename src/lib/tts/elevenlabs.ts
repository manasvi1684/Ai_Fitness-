import { ElevenLabsClient } from "elevenlabs";

export async function generateSpeech(text: string): Promise<ArrayBuffer> {
    if (!process.env.ELEVENLABS_API_KEY) {
        throw new Error("Missing ElevenLabs API Key");
    }

    const client = new ElevenLabsClient({
        apiKey: process.env.ELEVENLABS_API_KEY,
    });

    const audio = await client.generate({
        voice: process.env.ELEVENLABS_VOICE_ID || "Rachel",
        text,
        model_id: "eleven_monolingual_v1",
    });

    // Convert stream to ArrayBuffer
    const chunks = [];
    for await (const chunk of audio) {
        chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    return buffer as unknown as ArrayBuffer;
}
