import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

function buildPrompt(data: Record<string, string>): string {
  const { tool, tone, artistName, genre } = data;

  const toneMap: Record<string, string> = {
    street:
      "Write in a raw, authentic, street-culture voice. Use slang naturally but keep it readable. Think XXL Freshman bio meets hood memoir.",
    professional:
      "Write in a polished, industry-standard voice suitable for press outlets, playlist curators, and music blogs. Clean, authoritative, impressive.",
    storyteller:
      "Write in a cinematic, narrative voice. Paint a picture. Make the reader feel the artist's journey like a short film.",
    hype:
      "Write with high energy, exclamation points used sparingly but effectively. Think concert intro, festival announcement, or viral tweet energy.",
  };

  const toneInstruction = toneMap[tone] || toneMap.professional;

  if (tool === "bio") {
    return `You are a music industry publicist who writes artist bios for independent musicians. ${toneInstruction}

Generate 3 artist bios for the following artist. Each bio should be a different length:
1. **SHORT** (2-3 sentences) — perfect for social media profiles and streaming bios
2. **MEDIUM** (1 paragraph, 4-6 sentences) — ideal for press releases and playlist pitches
3. **LONG** (2-3 paragraphs) — full press kit bio for websites and media outreach

Artist: ${artistName}
Genre: ${genre}
${data.achievements ? `Key Achievements: ${data.achievements}` : ""}
${data.vibeDescription ? `Vibe/Story: ${data.vibeDescription}` : ""}

Format your response clearly with headers: SHORT BIO, MEDIUM BIO, LONG BIO. Each separated by a line break. Do not use markdown bold syntax — use ALL CAPS for headers instead.`;
  }

  if (tool === "onesheet") {
    return `You are a music publicist creating a professional release one-sheet. ${toneInstruction}

Create a complete press one-sheet for this release:

Artist: ${artistName}
Genre: ${genre}
Release Title: "${data.releaseTitle}"
${data.releaseType ? `Type: ${data.releaseType}` : ""}
${data.releaseDate ? `Release Date: ${data.releaseDate}` : ""}
${data.features ? `Featured Artists: ${data.features}` : ""}
${data.releaseDescription ? `Description: ${data.releaseDescription}` : ""}
${data.achievements ? `Artist Credits: ${data.achievements}` : ""}

Format the one-sheet with these sections (use ALL CAPS headers, no markdown bold):

ARTIST NAME & RELEASE TITLE
(formatted as a clean header)

ABOUT THE RELEASE
(2-3 sentences describing the release, its sound, and significance)

ABOUT THE ARTIST
(3-4 sentence bio)

KEY FACTS
- Genre:
- Release Date:
- Release Type:
- Featured Artists:
- For Fans Of: (suggest 3 similar artists)

STREAMING & LINKS
(placeholder section for the artist to fill in)

PRESS CONTACT
(placeholder for name, email, phone)

Keep it clean, professional, and ready to send to blogs, playlists, and press outlets.`;
  }

  if (tool === "promo") {
    return `You are a social media strategist who writes promotional captions for independent musicians. ${toneInstruction}

Create 5 ready-to-post social media captions for the following promotion:

Artist: ${artistName}
Genre: ${genre}
Release/Event: "${data.releaseTitle}"
${data.promoContext ? `Context: ${data.promoContext}` : ""}
${data.callToAction ? `Call to Action: ${data.callToAction}` : ""}
${data.streamingLink ? `Link: ${data.streamingLink}` : ""}

Generate one caption for each platform, optimized for each:

1. INSTAGRAM (engaging, use line breaks for readability, include 5-8 relevant hashtags at the end, keep under 2200 chars)

2. TIKTOK (hook in first line, casual/viral tone, 2-3 hashtags, keep short and punchy)

3. TWITTER / X (under 280 characters, impactful, no hashtag spam — max 2 hashtags)

4. FACEBOOK (slightly longer, conversational, include a question to drive comments)

5. EMAIL BLAST SUBJECT + PREVIEW (write a compelling email subject line and 2-sentence preview text)

Use ALL CAPS for platform headers. Include emojis where natural for the platform. Make each feel native to its platform, not copy-pasted.`;
  }

  return "Invalid tool selected.";
}

export async function POST(request: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Set ANTHROPIC_API_KEY in .env" },
        { status: 500 }
      );
    }

    const data = await request.json();

    if (!data.tool || !data.artistName || !data.genre) {
      return NextResponse.json(
        { error: "Missing required fields: tool, artistName, genre" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(data);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Anthropic API error:", errData);
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

    const result = await response.json();
    const content = result.content?.[0]?.text || "No content generated.";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
