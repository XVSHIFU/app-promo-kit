"use client";

import { useState, useEffect } from "react";
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
type Theme = "light" | "dark";

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
  const [theme, setTheme] = useState<Theme>("light");

  // Sync React state with the data-theme attribute set by the no-FOUC script.
  useEffect(() => {
    const cur = document.documentElement.getAttribute("data-theme");
    if (cur === "dark" || cur === "light") setTheme(cur);
  }, []);

  const toggleTheme = () => {
    const cur =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    const next: Theme = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage errors
    }
    setTheme(next);
  };

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
    "w-full rounded-xl border border-line bg-surface-2 text-ink text-sm px-3.5 py-2.5 transition focus-ring placeholder:text-muted hover:border-line-strong";

  return (
    <div className="relative min-h-screen text-ink">
      {/* Ambient background — coral/peach/teal blooms + masked grid (theme-aware via vars) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="anim-aurora absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "var(--blob1)" }}
        />
        <div
          className="anim-aurora absolute -top-20 right-[-10%] h-[380px] w-[380px] rounded-full blur-3xl"
          style={{ background: "var(--blob2)", animationDelay: "-6s" }}
        />
        <div
          className="anim-aurora absolute top-40 left-[-8%] h-[360px] w-[360px] rounded-full blur-3xl"
          style={{ background: "var(--blob3)", animationDelay: "-3s" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right,var(--grid-line) 1px,transparent 1px),linear-gradient(to bottom,var(--grid-line) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 55% at 50% 0%,#000 25%,transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 55% at 50% 0%,#000 25%,transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-accent-foreground shadow-[0_4px_20px_-6px_var(--ring)]">
              A
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-ink">
                {t("appName")}
              </h1>
              <p className="hidden text-xs text-muted sm:block">
                {t("appTagline")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              aria-label={t("themeToggle")}
              title={t("themeToggle")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition hover:border-line-strong hover:bg-surface-hover hover:text-ink focus-ring"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-line-strong hover:bg-surface-hover hover:text-ink focus-ring"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <a
              href="https://hackonvibe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-line-strong hover:bg-surface-hover hover:text-ink focus-ring sm:inline-block"
            >
              {t("hackathonBadge")}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
        {/* Hero */}
        <section className="mb-9 text-center">
          <span className="anim-fade inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            {t("heroBadge")}
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
            {t("heroLine1")}{" "}
            <span className="shimmer-text bg-gradient-to-r from-accent-deep to-accent-text bg-clip-text text-transparent">
              {t("heroLine2")}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted sm:text-[15px]">
            {t("heroDesc")}
          </p>
        </section>

        {/* Input Form */}
        <section className="grad-border mb-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="appName"
                  className="mb-1.5 block text-[10px] font-medium tracking-wider text-ink uppercase"
                >
                  {t("appNameLabel")} <span className="text-danger-text">*</span>
                </label>
                <input
                  id="appName"
                  type="text"
                  value={form.appName}
                  onChange={(e) => handleChange("appName", e.target.value)}
                  placeholder={t("appNamePlaceholder")}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="platform"
                  className="mb-1.5 block text-[10px] font-medium tracking-wider text-ink uppercase"
                >
                  {t("platformLabel")}
                </label>
                <select
                  id="platform"
                  value={form.platform}
                  onChange={(e) => handleChange("platform", e.target.value)}
                  className={inputClass}
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
              <label
                htmlFor="tagline"
                className="mb-1.5 block text-[10px] font-medium tracking-wider text-ink uppercase"
              >
                {t("taglineLabel")} <span className="text-danger-text">*</span>
              </label>
              <input
                id="tagline"
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                placeholder={t("taglinePlaceholder")}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="audience"
                className="mb-1.5 block text-[10px] font-medium tracking-wider text-ink uppercase"
              >
                {t("audienceLabel")}{" "}
                <span className="text-muted">{t("audienceOptional")}</span>
              </label>
              <input
                id="audience"
                type="text"
                value={form.audience}
                onChange={(e) => handleChange("audience", e.target.value)}
                placeholder={t("audiencePlaceholder")}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="features"
                className="mb-1.5 block text-[10px] font-medium tracking-wider text-ink uppercase"
              >
                {t("featuresLabel")}{" "}
                <span className="text-muted">{t("featuresOptional")}</span>
              </label>
              <textarea
                id="features"
                value={form.features}
                onChange={(e) => handleChange("features", e.target.value)}
                placeholder={t("featuresPlaceholder")}
                rows={3}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={usePro}
                    onChange={(e) => setUsePro(e.target.checked)}
                    className="h-4 w-4 rounded border-line bg-surface-2 text-accent focus-ring"
                  />
                  {t("usePro")}{" "}
                  <span className="text-xs text-muted">
                    {t("higherQuality")}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={fillSample}
                  className="text-xs text-accent-text transition hover:opacity-80 focus-ring"
                >
                  {t("fillSample")}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || !form.appName.trim() || !form.tagline.trim()}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_8px_30px_-8px_var(--ring)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_var(--ring)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none focus-ring sm:w-auto"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sheen to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {loading ? (
                  <>
                    <span className="anim-spin h-4 w-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                    {t("generating")}
                  </>
                ) : (
                  t("generate")
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Error */}
        {error && (
          <div className="anim-fade mb-6 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger-text">
            <span className="font-medium text-danger-text">{t("errorPrefix")}</span>{" "}
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mb-8 space-y-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-3 text-muted">
              <div className="anim-spin h-4 w-4 rounded-full border-2 border-line border-t-accent" />
              <span className="text-sm">{t("loadingText")}</span>
            </div>
            <div className="space-y-3">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
              <div className="h-2" />
              <div className="skeleton h-4 w-5/6 rounded" />
              <div className="skeleton h-4 w-2/5 rounded" />
            </div>
          </div>
        )}

        {/* Results */}
        {materials && !loading && (
          <section className="anim-fade-slide grad-border overflow-hidden rounded-2xl border border-line bg-surface">
            {/* Tabs */}
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-b border-line p-2 stagger">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-ring ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-accent to-accent-2 text-accent-foreground shadow-[0_4px_20px_-6px_var(--ring)]"
                      : "text-muted hover:bg-surface-hover hover:text-ink"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div key={activeTab} className="anim-fade p-5 sm:p-6">
              {activeTab === "landingPage" && (
                <LandingPageTab
                  data={materials.landingPage}
                  onCopy={handleCopy}
                  copied={copied}
                  t={t}
                />
              )}
              {activeTab === "appStore" && (
                <AppStoreTab
                  data={materials.appStore}
                  onCopy={handleCopy}
                  copied={copied}
                  t={t}
                />
              )}
              {activeTab === "tweets" && (
                <TweetsTab
                  data={materials.tweets}
                  onCopy={handleCopy}
                  copied={copied}
                  t={t}
                />
              )}
              {activeTab === "reddit" && (
                <RedditTab
                  data={materials.reddit}
                  onCopy={handleCopy}
                  copied={copied}
                  t={t}
                />
              )}
              {activeTab === "coldEmail" && (
                <ColdEmailTab
                  data={materials.coldEmail}
                  onCopy={handleCopy}
                  copied={copied}
                  t={t}
                />
              )}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!materials && !loading && !error && (
          <section className="anim-fade rounded-2xl border border-dashed border-line bg-surface-2/40 p-8 text-center sm:p-12">
            <div className="no-scrollbar mx-auto mb-5 flex max-w-md flex-wrap items-center justify-center gap-2 opacity-70">
              {tabs.map((tab) => (
                <span
                  key={tab.key}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-muted"
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </span>
              ))}
            </div>
            <h3 className="text-base font-medium text-ink">
              {t("emptyStateTitle")}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              {t("emptyStateDesc")}
            </p>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-14 border-t border-line pt-6 text-center text-xs text-muted">
          <p>{t("footerText")}</p>
        </footer>
      </main>
    </div>
  );
}

// --- Theme icons (inline SVG, no dependencies) ---

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l1.41-1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// --- Copy Button ---

function CopyButton({
  onCopy,
  copied,
  text,
  label,
  t,
}: {
  onCopy: (text: string) => void;
  copied: boolean;
  text: string;
  label: string;
  t: (key: TranslationKey) => string;
}) {
  return (
    <button
      onClick={() => onCopy(text)}
      className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1 text-xs font-medium text-muted transition hover:border-line-strong hover:bg-surface-hover hover:text-ink focus-ring"
    >
      {copied ? t("copied") : label}
    </button>
  );
}

// --- Tab Components ---

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[10px] font-medium tracking-wider text-muted uppercase">
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
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <SectionLabel>{t("landingPageCopy")}</SectionLabel>
        <CopyButton
          onCopy={onCopy}
          copied={copied}
          text={fullText}
          label={t("copy")}
          t={t}
        />
      </div>
      <div className="grad-border rounded-xl border border-line bg-surface-2 p-6">
        <h4 className="text-2xl font-semibold tracking-tight text-ink">
          {data.headline}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {data.subheading}
        </p>
      </div>
      <div>
        <SectionLabel>{t("features")}</SectionLabel>
        <ul className="space-y-2">
          {data.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SectionLabel>{t("ctaButton")}</SectionLabel>
        <span className="inline-block rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-medium text-accent-foreground shadow-[0_6px_24px_-8px_var(--ring)]">
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
        <CopyButton
          onCopy={onCopy}
          copied={copied}
          text={fullText}
          label={t("copy")}
          t={t}
        />
      </div>
      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <SectionLabel>{t("subtitleMax80")}</SectionLabel>
        <p className="text-sm font-medium text-ink">{data.shortDescription}</p>
      </div>
      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <SectionLabel>{t("fullDescription")}</SectionLabel>
        <div className="whitespace-pre-line text-sm leading-relaxed text-ink">
          {data.fullDescription}
        </div>
      </div>
      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <SectionLabel>{t("asoKeywords")}</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {data.keywords.split(",").map((kw, i) => (
            <span
              key={i}
              className="rounded-lg border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-xs text-accent-text"
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
        <CopyButton
          onCopy={onCopy}
          copied={copied}
          text={data.join("\n\n---\n\n")}
          label={t("copy")}
          t={t}
        />
      </div>
      {data.map((tweet, i) => (
        <div
          key={i}
          className="rounded-xl border border-line bg-surface-2 p-4 transition hover:border-line-strong"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-xs">
              🐦
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-ink">{tweet}</p>
              <p className="mt-2 text-xs text-muted">
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
        <CopyButton
          onCopy={onCopy}
          copied={copied}
          text={fullText}
          label={t("copy")}
          t={t}
        />
      </div>
      <div className="rounded-xl border border-accent/20 bg-accent-soft p-4">
        <div className="mb-3 flex items-center gap-2 text-xs text-accent-text">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {t("tabReddit")}
        </div>
        <h4 className="mb-2 text-base font-medium text-ink">{data.title}</h4>
        <div className="whitespace-pre-line text-sm leading-relaxed text-ink">
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
        <CopyButton
          onCopy={onCopy}
          copied={copied}
          text={fullText}
          label={t("copy")}
          t={t}
        />
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface-2">
        <div className="border-b border-line bg-surface-2 p-4">
          <span className="text-[10px] font-medium tracking-wider text-muted uppercase">
            {t("subject")}:{" "}
          </span>
          <span className="text-sm font-medium text-ink">
            {data.subject}
          </span>
        </div>
        <div className="border-l-2 border-accent p-4 whitespace-pre-line text-sm leading-relaxed text-ink">
          {data.body}
        </div>
      </div>
    </div>
  );
}
