# AppPromoKit — AI App Launch Material Generator

> Built for **HackOnVibe July 2026** hackathon (Theme: Promote a newly launched mobile app)

**English** | [中文](./README.zh-CN.md)

## What it does

Enter your app name and one-line positioning — get **5 channels of launch materials** in seconds:

| Channel | Output |
|---|---|
| 🌐 Landing Page | Hero headline, subheading, feature bullets, CTA button |
| 📦 App Store | Subtitle, full description, ASO keywords |
| 🐦 Tweets | 3 platform-appropriate tweets (with char count) |
| 👾 Reddit | Authentic, non-salesy Reddit post (title + body) |
| ✉️ Cold Email | Subject line + personalized outreach body |

Each channel's tone is adapted: App Store = professional & discoverable, Twitter = punchy, Reddit = authentic, Email = respectful & personalized.

## AI Stack

- **Model**: DeepSeek v4 (flash for speed, pro for quality) via OpenAI-compatible API
- **Architecture**: Single structured LLM call → JSON output → tabbed UI
- **Prompt engineering**: System prompt establishes marketing expertise; user prompt enforces channel-specific tone rules and JSON schema
- **Not a wrapper**: The prompt encodes real marketing knowledge (ASO best practices, Reddit authenticity norms, cold email conventions) — the AI doesn't just "write text," it follows a structured content strategy

## Tech Stack

- **Framework**: Next.js 16 (App Router, webpack)
- **Styling**: Tailwind CSS v4
- **AI**: DeepSeek API (OpenAI SDK compatible)
- **Deploy**: Vercel
- **Language**: TypeScript

## Getting Started

```bash
# Clone
git clone https://github.com/XVSHIFU/app-promo-kit.git
cd app-promo-kit

# Install
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your DeepSeek API key

# Run
npm run dev
# Open http://localhost:3000
```

### Environment Variables

```
DEEPSEEK_API_KEY=your-api-key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
DEEPSEEK_MODEL_PRO=deepseek-v4-pro
```

## Target Users

- **Indie developers** launching their first app with no marketing budget
- **Small studios** that need launch materials across channels but can't afford an agency
- **Product managers** running multiple app launches who need consistent, quality copy

## What was built during the hackathon

Everything in this repo was built during the HackOnVibe July 2026 build weekend (July 10–12, 2026):
- Next.js project setup with App Router + Tailwind
- DeepSeek API integration with structured JSON output
- Multi-channel prompt engineering system
- Tabbed results UI with copy-to-clipboard
- Light/dark mode support
- Vercel deployment

## License

MIT
