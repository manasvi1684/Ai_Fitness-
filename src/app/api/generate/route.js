import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      age,
      gender,
      height,
      weight,
      goal,
      level,
      location,
      diet,
      extras,
    } = body;

    // ============================================================
    // STRICT, FORCE-CONSISTENT PROMPT
    // ============================================================
    const prompt = `
You MUST return ONLY valid JSON.
Do NOT include code fences.
Do NOT include markdown.
Do NOT add extra fields.
Do NOT change the schema.

OUTPUT MUST FOLLOW THIS EXACT STRUCTURE:

{
  "workoutPlan": [
    {
      "day": "string",
      "exercises": [
        {
          "name": "string",
          "sets": "string",
          "reps": "string",
          "rest": "string"
        }
      ]
    }
  ],
  "dietPlan": {
    "breakfast": [{ "name": "string" }],
    "lunch": [{ "name": "string" }],
    "dinner": [{ "name": "string" }],
    "snacks": [{ "name": "string" }]
  },
  "tips": ["string"]
}

RULES:
- ALWAYS return 7 workoutPlan days (Mon–Sun).
- ALWAYS return an array of exercises for each day.
- ALWAYS fill dietPlan lists, or return empty arrays.
- ALWAYS return tips as a simple array of strings.
- NEVER invent extra objects or nesting.
- If unsure about any field, return empty strings or empty arrays.

User Info:
Name: ${name}
Age: ${age}
Gender: ${gender}
Height: ${height}
Weight: ${weight}
Goal: ${goal}
Level: ${level}
Location: ${location}
Diet: ${diet}
Extras: ${extras}
`;

    // ============================================================
    // GEMINI REQUEST
    // ============================================================
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const raw = await geminiRes.json();
    console.log("GEMINI RAW:", JSON.stringify(raw, null, 2));

    const aiText =
      raw?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Clean backticks just in case
    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("CLEANED:", cleaned);

    // ============================================================
    // PARSE JSON SAFELY
    // ============================================================
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ JSON Parse Error", err);
      return NextResponse.json(
        { error: "Invalid JSON returned from Gemini", text: cleaned },
        { status: 500 }
      );
    }

    // ============================================================
    // NOTHING TO NORMALIZE — the schema is fixed
    // ============================================================

    console.log("FINAL PLAN:", parsed);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
