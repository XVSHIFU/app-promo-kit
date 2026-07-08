// Prompt templates for AppPromoKit — AI App Launch Material Generator

export interface AppInput {
  appName: string;
  tagline: string;
  audience?: string;
  platform?: string;
  features?: string;
}

export interface PromoMaterials {
  landingPage: {
    headline: string;
    subheading: string;
    features: string[];
    cta: string;
  };
  appStore: {
    shortDescription: string;
    fullDescription: string;
    keywords: string;
  };
  tweets: string[];
  reddit: {
    title: string;
    body: string;
  };
  coldEmail: {
    subject: string;
    body: string;
  };
}

export const SYSTEM_PROMPT = `You are an expert app marketing copywriter and growth strategist.
Your job: generate high-converting promotional materials for a newly launched mobile app.
You understand the nuances of each channel — App Store SEO, Twitter/X engagement, Reddit authenticity, and cold email outreach.
You write copy that feels human, not generic AI output. You avoid hype words like "revolutionary", "game-changing", "ultimate".
Return ONLY valid JSON. No markdown fences, no commentary before or after.`;

export function buildUserPrompt(input: AppInput): string {
  const parts: string[] = [
    `App name: ${input.appName}`,
    `One-line positioning: ${input.tagline}`,
  ];
  if (input.audience) parts.push(`Target audience: ${input.audience}`);
  if (input.platform) parts.push(`Platform: ${input.platform}`);
  if (input.features) parts.push(`Key features: ${input.features}`);

  parts.push(
    `
Generate promotional materials as a JSON object with this exact shape:
{
  "landingPage": {
    "headline": "a punchy 5-10 word hero headline",
    "subheading": "one sentence expanding on the headline",
    "features": ["3-4 benefit-driven feature bullets, each one short phrase"],
    "cta": "a 2-4 word call-to-action button label"
  },
  "appStore": {
    "shortDescription": "one compelling sentence (max 80 chars for App Store subtitle)",
    "fullDescription": "a 3-paragraph app store description with clear value prop, feature highlights, and a closing hook. Use line breaks between paragraphs.",
    "keywords": "comma-separated ASO keywords (max 100 chars, no spaces after commas)"
  },
  "tweets": ["3 engaging tweets for Twitter/X, each under 280 chars, mixing benefit-driven and conversational tones"],
  "reddit": {
    "title": "an authentic, non-salesy Reddit post title for a relevant subreddit",
    "body": "a genuine Reddit post body that shares the app naturally, mentions what problem it solves, and invites feedback. Keep it conversational and honest."
  },
  "coldEmail": {
    "subject": "a personalized cold email subject line to a tech blogger or influencer",
    "body": "a short, respectful cold email body (3-4 short paragraphs) introducing the app, why it's relevant to their audience, and a soft ask."
  }
}

Rules:
- Adapt tone to each channel: App Store = professional & discoverable, Twitter = punchy & engaging, Reddit = authentic & community-oriented, Email = respectful & personalized.
- Reference the ACTUAL app name and real features from the input.
- Do NOT use placeholder text like "your app" — use the real name.
- Return ONLY the JSON object, nothing else.`
  );

  return parts.join("\n");
}
