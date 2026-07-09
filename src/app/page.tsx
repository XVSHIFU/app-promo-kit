"use client";

import { useState } from "react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import type { PromoMaterials } from "@/lib/prompts";

interface FormData {
  appName: string;
  tagline: string;
  audience: string;
  platform: string;
  features: string;
}

const PLATFORMS = ["iOS", "Android", "iOS & Android", "Cross-platform"];

type TabKey = "landingPage" | "appStore" | "tweets" | "reddit" | "coldEmail";

export default function Home() {
  const { t, lang, toggleLang } = useI18n();

  const [form, setForm] = useState<FormData>({
    appName: "",
    tagline: "",
    audience: "",
    platform: "iOS",
    features: "",
  });
  const [usePro, setUsePro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [materials, setMaterials] = useState<PromoMaterials | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("landingPage");
  const [copied, setCopied] = useState(false);

  const sample: FormData = {
    appName: t("sampleAppName"),
    tagline: t("sampleTagline"),
    audience: t("sampleAudience"),
    platform: "iOS",
    features: t("sampleFeatures"),
  };

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "landingPage", label: t("tabLanding"), icon: "🌐" },
    { key: "appStore", label: t("tabAppStore"), icon: "📦" },
    { key: "tweets", label: t("tabTweets"), icon: "🐦" },
    { key: "reddit", label: t("tabReddit"), icon: "👾" },
    { key: "coldEmail", label: t("tabColdEmail"), icon: "✉️" },
  ];

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.appName.trim() || !form.tagline.trim()) return;

    setLoading(true);
    setError(null);
    setMaterials(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, model: usePro ? "pro" : "flash" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMaterials(data.materials);
      setActiveTab("landingPage");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const fillSample = () => setForm(sample);

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.03] text-zinc-200 text-sm px-3 py-2 transition-opacity duration-150 focus:outline-none focus:border-[#5e6ad2]/50 placeholder:text-zinc-600";

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5e6ad2] text-sm font-bold text-white">
              A
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-zinc-100">
                {t("appName")}
              </h1>
              <p className="text-xs text-zinc-500">{t("appTagline")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-opacity duration-150 hover:bg-white/[0.05] hover:text-zinc-200"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <a
              href="https://hackonvibe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-opacity duration-150 hover:bg-white/[0.05] hover:text-zinc-200"
            >
              {t("hackathonBadge")}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <section className="mb-8 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-100">
            {t("heroLine1")}{" "}
            <span className="bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] bg-clip-text text-transparent">
              {t("heroLine2")}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-500">
            {t("heroDesc")}
          </p>
        </section>

        {/* Input Form */}
        <section className="mb-8 rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
                  {t("appNameLabel")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.appName}
                  onChange={(e) => handleChange("appName", e.target.value)}
                  placeholder={t("appNamePlaceholder")}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
                  {t("platformLabel")}
                </label>
                <select
                  value={form.platform}
                  onChange={(e) => handleChange("platform", e.target.value)}
                  className={inputClass}
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p} className="bg-[#161618] text-zinc-200">
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
                {t("taglineLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                placeholder={t("taglinePlaceholder")}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
                {t("audienceLabel")}{" "}
                <span className="text-zinc-600">{t("audienceOptional")}</span>
              </label>
              <input
                type="text"
                value={form.audience}
                onChange={(e) => handleChange("audience", e.target.value)}
                placeholder={t("audiencePlaceholder")}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
                {t("featuresLabel")}{" "}
                <span className="text-zinc-600">{t("featuresOptional")}</span>
              </label>
              <textarea
                value={form.features}
                onChange={(e) => handleChange("features", e.target.value)}
                placeholder={t("featuresPlaceholder")}
                rows={3}
                className={inputClass}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                  <input
                    type="checkbox"
                    checked={usePro}
                    onChange={(e) => setUsePro(e.target.checked)}
                    className="h-4 w-4 rounded border-white/10 bg-white/[0.03] text-[#5e6ad2] focus:outline-none"
                  />
                  {t("usePro")}{" "}
                  <span className="text-xs text-zinc-600">{t("higherQuality")}</span>
                </label>
                <button
                  type="button"
                  onClick={fillSample}
                  className="text-xs text-[#5e6ad2] transition-opacity duration-150 hover:opacity-80"
                >
                  {t("fillSample")}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || !form.appName.trim() || !form.tagline.trim()}
                className="rounded-lg bg-[#5e6ad2] px-6 py-2.5 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? t("generating") : t("generate")}
              </button>
            </div>
          </form>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {t("errorPrefix")} {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mb-8 space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-3 text-zinc-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#5e6ad2]" />
              <span className="text-sm">{t("loadingText")}</span>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
            </div>
          </div>
        )}

        {/* Results */}
        {materials && !loading && (
          <section className="rounded-lg border border-white/10 bg-white/[0.03]">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-white/10 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-opacity duration-150 ${
                    activeTab === tab.key
                      ? "bg-[#5e6ad2] text-white"
                      : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-5">
              {activeTab === "landingPage" && (
                <LandingPageTab data={materials.landingPage} onCopy={handleCopy} copied={copied} t={t} />
              )}
              {activeTab === "appStore" && (
                <AppStoreTab data={materials.appStore} onCopy={handleCopy} copied={copied} t={t} />
              )}
              {activeTab === "tweets" && (
                <TweetsTab data={materials.tweets} onCopy={handleCopy} copied={copied} t={t} />
              )}
              {activeTab === "reddit" && (
                <RedditTab data={materials.reddit} onCopy={handleCopy} copied={copied} t={t} />
              )}
              {activeTab === "coldEmail" && (
                <ColdEmailTab data={materials.coldEmail} onCopy={handleCopy} copied={copied} t={t} />
              )}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-zinc-600">
          <p>{t("footerText")}</p>
        </footer>
      </main>
    </div>
  );
}

// --- Copy Button (Linear style) ---

function CopyButton({
  onCopy,
  copied,
  text,
  label,
}: {
  onCopy: (text: string) => void;
  copied: boolean;
  text: string;
  label: string;
}) {
  return (
    <button
      onClick={() => onCopy(text)}
      className="rounded-lg border border-white/10 px-3 py-1 text-xs font-medium text-zinc-400 transition-opacity duration-150 hover:bg-white/[0.05] hover:text-zinc-200"
    >
      {copied ? (label === "Copy" ? "✓ Copied" : "✓ 已复制") : label}
    </button>
  );
}

// --- Tab Components ---

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[10px] font-medium tracking-wider uppercase text-zinc-500">
      {children}
    </p>
  );
}

function LandingPageTab({
  data,
  onCopy,
  copied,
  t,
}: {
  data: PromoMaterials["landingPage"];
  onCopy: (t: string) => void;
  copied: boolean;
  t: (key: TranslationKey) => string;
}) {
  const fullText = `${data.headline}\n\n${data.subheading}\n\nFeatures:\n${data.features
    .map((f) => `- ${f}`)
    .join("\n")}\n\nCTA: ${data.cta}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionLabel>{t("landingPageCopy")}</SectionLabel>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} label={t("copy")} />
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <h4 className="text-2xl font-semibold tracking-tight text-zinc-100">
          {data.headline}
        </h4>
        <p className="mt-2 text-sm text-zinc-400">{data.subheading}</p>
      </div>
      <div>
        <SectionLabel>{t("features")}</SectionLabel>
        <ul className="space-y-1.5">
          {data.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
              <span className="mt-0.5 text-[#5e6ad2]">▸</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SectionLabel>{t("ctaButton")}</SectionLabel>
        <span className="inline-block rounded-lg bg-[#5e6ad2] px-4 py-2 text-sm font-medium text-white">
          {data.cta}
        </span>
      </div>
    </div>
  );
}

function AppStoreTab({
  data,
  onCopy,
  copied,
  t,
}: {
  data: PromoMaterials["appStore"];
  onCopy: (t: string) => void;
  copied: boolean;
  t: (key: TranslationKey) => string;
}) {
  const fullText = `Subtitle: ${data.shortDescription}\n\n${data.fullDescription}\n\nKeywords: ${data.keywords}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionLabel>{t("appStoreDesc")}</SectionLabel>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} label={t("copy")} />
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <SectionLabel>{t("subtitleMax80")}</SectionLabel>
        <p className="text-sm font-medium text-zinc-200">{data.shortDescription}</p>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <SectionLabel>{t("fullDescription")}</SectionLabel>
        <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
          {data.fullDescription}
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <SectionLabel>{t("asoKeywords")}</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {data.keywords.split(",").map((kw, i) => (
            <span
              key={i}
              className="rounded-lg border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-2.5 py-0.5 text-xs text-[#8b9cf6]"
            >
              {kw.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TweetsTab({
  data,
  onCopy,
  copied,
  t,
}: {
  data: string[];
  onCopy: (t: string) => void;
  copied: boolean;
  t: (key: TranslationKey) => string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SectionLabel>{t("tweetsLabel")}</SectionLabel>
        <CopyButton onCopy={onCopy} copied={copied} text={data.join("\n\n---\n\n")} label={t("copy")} />
      </div>
      {data.map((tweet, i) => (
        <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5e6ad2]/20 text-xs">
              🐦
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-300">{tweet}</p>
              <p className="mt-2 text-xs text-zinc-600">
                {tweet.length} {t("chars")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RedditTab({
  data,
  onCopy,
  copied,
  t,
}: {
  data: PromoMaterials["reddit"];
  onCopy: (t: string) => void;
  copied: boolean;
  t: (key: TranslationKey) => string;
}) {
  const fullText = `${data.title}\n\n${data.body}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionLabel>{t("redditPost")}</SectionLabel>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} label={t("copy")} />
      </div>
      <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
        <h4 className="mb-2 text-base font-medium text-zinc-100">{data.title}</h4>
        <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
          {data.body}
        </div>
      </div>
    </div>
  );
}

function ColdEmailTab({
  data,
  onCopy,
  copied,
  t,
}: {
  data: PromoMaterials["coldEmail"];
  onCopy: (t: string) => void;
  copied: boolean;
  t: (key: TranslationKey) => string;
}) {
  const fullText = `Subject: ${data.subject}\n\n${data.body}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionLabel>{t("coldEmailLabel")}</SectionLabel>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} label={t("copy")} />
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <div className="mb-3 border-b border-white/10 pb-3">
          <span className="text-[10px] font-medium tracking-wider uppercase text-zinc-500">
            {t("subject")}:{" "}
          </span>
          <span className="text-sm font-medium text-zinc-200">{data.subject}</span>
        </div>
        <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
          {data.body}
        </div>
      </div>
    </div>
  );
}
