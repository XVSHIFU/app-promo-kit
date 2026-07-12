import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT, buildUserPrompt, type AppInput, type PromoMaterials } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const body: AppInput & { model?: string } = await req.json();

    // Validate required fields
    if (!body.appName?.trim() || !body.tagline?.trim()) {
      return NextResponse.json(
        { error: "App name and tagline are required." },
        { status: 400 }
      );
    }

    // Create the client at request time (not module level) so `next build`'s
    // "collect page data" phase doesn't require the API key during build.
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "DeepSeek API key not configured on the server." },
        { status: 500 }
      );
    }
    const client = new OpenAI({
      apiKey,
      baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    });

    const usePro = body.model === "pro";
    const model = usePro
      ? process.env.DEEPSEEK_MODEL_PRO || "deepseek-v4-pro"
      : process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(body) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "AI returned no content. Try again." },
        { status: 502 }
      );
    }

    const materials = JSON.parse(content) as PromoMaterials;

    return NextResponse.json({
      materials,
      model: usePro ? "deepseek-v4-pro" : "deepseek-v4-flash",
      usage: completion.usage,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Generate API error:", message);
    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    );
  }
}
