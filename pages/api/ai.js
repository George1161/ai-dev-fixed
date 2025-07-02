// pages/api/ai.js
import OpenAI from "openai";

// 1️⃣  initialise the SDK once per Lambda
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,   // ⬅️ make sure this env-var is set in Vercel
});

// 2️⃣  the Next.js API route
export default async function handler(req, res) {
  /* ----------------------------------------------------
   * Quick sanity-check so you can visit /api/ai in a browser
   * -------------------------------------------------- */
  if (req.method === "GET") {
    return res.status(200).json({
      status: "ok",
      message: "AI route is alive – send a POST with { prompt }",
    });
  }

  /* ----------------------------------------------------
   * Only allow POST beyond this point
   * -------------------------------------------------- */
  if (req.method !== "POST") {
    // Anything other than POST (or the GET check above) → 405
    return res.status(405).json({ error: "Method not allowed" });
  }

  /* ----------------------------------------------------
   * Parse and validate body
   * -------------------------------------------------- */
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    /* ------------------------------------------------
     * Call OpenAI Chat Completions
     * ------------------------------------------------ */
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",   // change to gpt-4o/gpt-4o-mini etc. if you have access
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user",   content: prompt },
      ],
    });

    const responseText = completion.choices[0]?.message?.content || "(no response)";
    return res.status(200).json({ result: responseText });
  } catch (err) {
    // Log full details to Vercel function logs for debugging
    console.error("OpenAI API Error:", err?.response?.data || err);
    return res.status(500).json({ error: "Something went wrong with OpenAI API" });
  }
}
