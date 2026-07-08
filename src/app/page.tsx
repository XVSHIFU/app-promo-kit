"use client";

import { useState } from "react";
import type { PromoMaterials } from "@/lib/prompts";

interface FormData {
  appName: string;
  tagline: string;
  audience: string;
  platform: string;
  features: string;
}

const SAMPLE: FormData = {
  appName: "FocusBear",
  tagline: "AI focus timer that blocks distractions and schedules deep work",
  audience: "Remote workers and students who struggle with procrastination",
  platform: "iOS",
  features: "AI-powered distraction blocking, smart deep-work scheduling, weekly focus analytics, pomodoro with ambient sounds",
};

const PLATFORMS = ["iOS", "Android", "iOS & Android", "Cross-platform"];

type TabKey = "landingPage" | "appStore" | "tweets" | "reddit" | "coldEmail";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "landingPage", label: "Landing Page", icon: "🌐" },
  { key: "appStore", label: "App Store", icon: "📦" },
  { key: "tweets", label: "Tweets", icon: "🐦" },
  { key: "reddit", label: "Reddit", icon: "👾" },
  { key: "coldEmail", label: "Cold Email", icon: "✉️" },
];

export default function Home() {
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

  const fillSample = () => setForm(SAMPLE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-black dark:to-zinc-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-sm">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                AppPromoKit
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                AI App Launch Material Generator
              </p>
            </div>
          </div>
          <a
            href="https://hackonvibe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            HackOnVibe July 2026
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Ship your app.{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Generate launch materials in seconds.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-zinc-400">
            Enter your app name and positioning. Get landing page copy, App Store
            description, tweets, a Reddit post, and a cold email — all tailored to
            your app.
          </p>
        </section>

        {/* Input Form */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                  App Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.appName}
                  onChange={(e) => handleChange("appName", e.target.value)}
                  placeholder="e.g. FocusBear"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                  Platform
                </label>
                <select
                  value={form.platform}
                  onChange={(e) => handleChange("platform", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                One-line Positioning <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                placeholder="e.g. AI focus timer that blocks distractions and schedules deep work"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                Target Audience{" "}
                <span className="text-slate-400">(optional)</span>
              </label>
              <input
                type="text"
                value={form.audience}
                onChange={(e) => handleChange("audience", e.target.value)}
                placeholder="e.g. Remote workers and students who struggle with procrastination"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                Key Features{" "}
                <span className="text-slate-400">(optional, comma-separated)</span>
              </label>
              <textarea
                value={form.features}
                onChange={(e) => handleChange("features", e.target.value)}
                placeholder="e.g. AI distraction blocking, smart scheduling, focus analytics, pomodoro with ambient sounds"
                rows={3}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={usePro}
                    onChange={(e) => setUsePro(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
                  />
                  Use <span className="font-medium">deepseek-v4-pro</span>{" "}
                  <span className="text-xs text-slate-400">(higher quality)</span>
                </label>
                <button
                  type="button"
                  onClick={fillSample}
                  className="text-xs text-indigo-500 underline hover:text-indigo-600"
                >
                  Fill sample data
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || !form.appName.trim() || !form.tagline.trim()}
                className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-600 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating…" : "Generate Materials"}
              </button>
            </div>
          </form>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-500" />
              <span className="text-sm">
                AI is crafting your launch materials…
              </span>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
            </div>
          </div>
        )}

        {/* Results */}
        {materials && !loading && (
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-slate-200 p-2 dark:border-zinc-800">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab.key
                      ? "bg-indigo-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === "landingPage" && (
                <LandingPageTab data={materials.landingPage} onCopy={handleCopy} copied={copied} />
              )}
              {activeTab === "appStore" && (
                <AppStoreTab data={materials.appStore} onCopy={handleCopy} copied={copied} />
              )}
              {activeTab === "tweets" && (
                <TweetsTab data={materials.tweets} onCopy={handleCopy} copied={copied} />
              )}
              {activeTab === "reddit" && (
                <RedditTab data={materials.reddit} onCopy={handleCopy} copied={copied} />
              )}
              {activeTab === "coldEmail" && (
                <ColdEmailTab data={materials.coldEmail} onCopy={handleCopy} copied={copied} />
              )}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-slate-400">
          <p>
            Built for HackOnVibe July 2026 · Powered by DeepSeek AI · Next.js +
            Vercel
          </p>
        </footer>
      </main>
    </div>
  );
}

// --- Tab Components ---

function CopyButton({
  onCopy,
  copied,
  text,
}: {
  onCopy: (text: string) => void;
  copied: boolean;
  text: string;
}) {
  return (
    <button
      onClick={() => onCopy(text)}
      className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function LandingPageTab({
  data,
  onCopy,
  copied,
}: {
  data: PromoMaterials["landingPage"];
  onCopy: (t: string) => void;
  copied: boolean;
}) {
  const fullText = `${data.headline}\n\n${data.subheading}\n\nFeatures:\n${data.features
    .map((f) => `• ${f}`)
    .join("\n")}\n\nCTA: ${data.cta}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Landing Page Copy
        </h3>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} />
      </div>
      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 p-6 dark:from-zinc-800 dark:to-zinc-800">
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
          {data.headline}
        </h4>
        <p className="mt-2 text-slate-600 dark:text-zinc-400">{data.subheading}</p>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Features
        </p>
        <ul className="space-y-1.5">
          {data.features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300"
            >
              <span className="mt-0.5 text-indigo-500">▸</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          CTA Button
        </p>
        <span className="inline-block rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
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
}: {
  data: PromoMaterials["appStore"];
  onCopy: (t: string) => void;
  copied: boolean;
}) {
  const fullText = `Subtitle: ${data.shortDescription}\n\n${data.fullDescription}\n\nKeywords: ${data.keywords}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          App Store Description
        </h3>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} />
      </div>
      <div className="rounded-lg border border-slate-200 p-4 dark:border-zinc-700">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Subtitle (≤80 chars)
        </p>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {data.shortDescription}
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 p-4 dark:border-zinc-700">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Full Description
        </p>
        <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
          {data.fullDescription}
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 p-4 dark:border-zinc-700">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          ASO Keywords
        </p>
        <div className="flex flex-wrap gap-1.5">
          {data.keywords.split(",").map((kw, i) => (
            <span
              key={i}
              className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
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
}: {
  data: string[];
  onCopy: (t: string) => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Tweets / X Posts
        </h3>
        <CopyButton onCopy={onCopy} copied={copied} text={data.join("\n\n---\n\n")} />
      </div>
      {data.map((tweet, i) => (
        <div
          key={i}
          className="rounded-lg border border-slate-200 p-4 dark:border-zinc-700"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-xs font-bold text-white">
              🐦
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-700 dark:text-zinc-300">{tweet}</p>
              <p className="mt-2 text-xs text-slate-400">{tweet.length} chars</p>
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
}: {
  data: PromoMaterials["reddit"];
  onCopy: (t: string) => void;
  copied: boolean;
}) {
  const fullText = `${data.title}\n\n${data.body}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Reddit Post
        </h3>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} />
      </div>
      <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-800/50 dark:bg-orange-950/20">
        <h4 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
          {data.title}
        </h4>
        <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
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
}: {
  data: PromoMaterials["coldEmail"];
  onCopy: (t: string) => void;
  copied: boolean;
}) {
  const fullText = `Subject: ${data.subject}\n\n${data.body}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Cold Email
        </h3>
        <CopyButton onCopy={onCopy} copied={copied} text={fullText} />
      </div>
      <div className="rounded-lg border border-slate-200 p-4 dark:border-zinc-700">
        <div className="mb-3 border-b border-slate-100 pb-3 dark:border-zinc-700">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Subject:{" "}
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {data.subject}
          </span>
        </div>
        <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
          {data.body}
        </div>
      </div>
    </div>
  );
}
