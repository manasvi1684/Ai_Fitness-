import { NextResponse } from "next/server";
import { generateImage } from "@/lib/image/provider";
import { getStubImage } from "@/lib/image/stub";

export async function POST(req: Request) {
    let prompt = "";
    try {
        const body = await req.json();
        prompt = body.prompt;

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Check for Stub Mode
        if (!process.env.REPLICATE_API_KEY || process.env.NEXT_PUBLIC_IMAGE_STUB === "true") {
            console.log("Image Stub Mode");
            // Simulate delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return NextResponse.json({ url: getStubImage(prompt) });
        }

        const url = await generateImage(prompt);
        return NextResponse.json({ url });

    } catch (err) {
        console.error("Image API Error:", err);
        // Fallback to stub on error
        return NextResponse.json({ url: getStubImage(prompt || "fitness") });
    }
}
