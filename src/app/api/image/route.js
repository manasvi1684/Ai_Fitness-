import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const HF_KEY = process.env.HF_API_KEY;

    const res = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.log("HF ERROR:", err);
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return NextResponse.json({
      url: `data:image/png;base64,${base64}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
