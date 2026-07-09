"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "zh";

const translations = {
  en: {
    // Header
    appName: "AppPromoKit",
    appTagline: "AI App Launch Material Generator",
    hackathonBadge: "HackOnVibe July 2026",

    // Hero
    heroLine1: "Ship your app.",
    heroLine2: "Generate launch materials in seconds.",
    heroDesc:
      "Enter your app name and positioning. Get landing page copy, App Store description, tweets, a Reddit post, and a cold email — all tailored to your app.",

    // Form
    appNameLabel: "App Name",
    appNamePlaceholder: "e.g. FocusBear",
    platformLabel: "Platform",
    taglineLabel: "One-line Positioning",
    taglinePlaceholder: "e.g. AI focus timer that blocks distractions and schedules deep work",
    audienceLabel: "Target Audience",
    audienceOptional: "(optional)",
    audiencePlaceholder: "e.g. Remote workers and students who struggle with procrastination",
    featuresLabel: "Key Features",
    featuresOptional: "(optional, comma-separated)",
    featuresPlaceholder: "e.g. AI distraction blocking, smart scheduling, focus analytics, pomodoro with ambient sounds",
    usePro: "Use deepseek-v4-pro",
    higherQuality: "(higher quality)",
    fillSample: "Fill sample data",
    generate: "Generate Materials",
    generating: "Generating…",

    // Sample data
    sampleAppName: "FocusBear",
    sampleTagline: "AI focus timer that blocks distractions and schedules deep work",
    sampleAudience: "Remote workers and students who struggle with procrastination",
    sampleFeatures: "AI-powered distraction blocking, smart deep-work scheduling, weekly focus analytics, pomodoro with ambient sounds",

    // Loading
    loadingText: "AI is crafting your launch materials…",

    // Tabs
    tabLanding: "Landing Page",
    tabAppStore: "App Store",
    tabTweets: "Tweets",
    tabReddit: "Reddit",
    tabColdEmail: "Cold Email",

    // Tab sections
    landingPageCopy: "Landing Page Copy",
    features: "Features",
    ctaButton: "CTA Button",
    appStoreDesc: "App Store Description",
    subtitleMax80: "Subtitle (≤80 chars)",
    fullDescription: "Full Description",
    asoKeywords: "ASO Keywords",
    tweetsLabel: "Tweets / X Posts",
    redditPost: "Reddit Post",
    coldEmailLabel: "Cold Email",
    subject: "Subject",
    chars: "chars",

    // Copy
    copy: "Copy",
    copied: "✓ Copied",

    // Footer
    footerText: "Built for HackOnVibe July 2026 · Powered by DeepSeek AI · Next.js + Netlify",

    // Error
    errorPrefix: "Generation failed:",
    requiredError: "App name and tagline are required.",
  },
  zh: {
    // Header
    appName: "AppPromoKit",
    appTagline: "AI 应用推广素材生成器",
    hackathonBadge: "HackOnVibe 2026 七月赛",

    // Hero
    heroLine1: "发布你的 App。",
    heroLine2: "秒级生成全套推广素材。",
    heroDesc:
      "输入 App 名称和定位，一键生成落地页文案、应用商店描述、推文、Reddit 帖子和冷启动邮件——全部为你的 App 量身定制。",

    // Form
    appNameLabel: "App 名称",
    appNamePlaceholder: "例如 FocusBear",
    platformLabel: "平台",
    taglineLabel: "一句话定位",
    taglinePlaceholder: "例如 AI 专注计时器，屏蔽干扰并安排深度工作",
    audienceLabel: "目标用户",
    audienceOptional: "（选填）",
    audiencePlaceholder: "例如 远程办公者和拖延症学生",
    featuresLabel: "核心功能",
    featuresOptional: "（选填，逗号分隔）",
    featuresPlaceholder: "例如 AI 干扰屏蔽、智能排程、专注分析、番茄钟+白噪音",
    usePro: "使用 deepseek-v4-pro",
    higherQuality: "（质量更好）",
    fillSample: "填充示例数据",
    generate: "生成推广素材",
    generating: "生成中…",

    // Sample data
    sampleAppName: "FocusBear",
    sampleTagline: "AI focus timer that blocks distractions and schedules deep work",
    sampleAudience: "Remote workers and students who struggle with procrastination",
    sampleFeatures: "AI-powered distraction blocking, smart deep-work scheduling, weekly focus analytics, pomodoro with ambient sounds",

    // Loading
    loadingText: "AI 正在生成你的推广素材…",

    // Tabs
    tabLanding: "落地页",
    tabAppStore: "应用商店",
    tabTweets: "推文",
    tabReddit: "Reddit",
    tabColdEmail: "冷启动邮件",

    // Tab sections
    landingPageCopy: "落地页文案",
    features: "功能亮点",
    ctaButton: "行动按钮",
    appStoreDesc: "应用商店描述",
    subtitleMax80: "副标题（≤80字符）",
    fullDescription: "完整描述",
    asoKeywords: "ASO 关键词",
    tweetsLabel: "推文 / X 帖子",
    redditPost: "Reddit 帖子",
    coldEmailLabel: "冷启动邮件",
    subject: "主题",
    chars: "字符",

    // Copy
    copy: "复制",
    copied: "✓ 已复制",

    // Footer
    footerText: "HackOnVibe 2026 七月赛参赛作品 · 由 DeepSeek AI 驱动 · Next.js + Netlify",

    // Error
    errorPrefix: "生成失败：",
    requiredError: "App 名称和定位为必填项。",
  },
};

export type TranslationKey = keyof typeof translations.en;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "zh") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const toggleLang = () => setLang(lang === "en" ? "zh" : "en");

  const t = (key: TranslationKey) => translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
