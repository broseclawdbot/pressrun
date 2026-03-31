"use client";

import { useState } from "react";

type ToolType = "bio" | "onesheet" | "promo";
type ToneType = "street" | "professional" | "storyteller" | "hype";

const tools: { id: ToolType; label: string; icon: string }[] = [
  { id: "bio", label: "Artist Bio", icon: "👤" },
  { id: "onesheet", label: "Release One-Sheet", icon: "📄" },
  { id: "promo", label: "Social Promo Pack", icon: "📱" },
];

const tones: { id: ToneType; label: string }[] = [
  { id: "street", label: "Street / Raw" },
  { id: "professional", label: "Professional" },
  { id: "storyteller", label: "Storyteller" },
  { id: "hype", label: "Hype / Energy" },
];

export default function GeneratePage() {
  const [activeTool, setActiveTool] = useState<ToolType>("bio");
  const [tone, setTone] = useState<ToneType>("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [generationsLeft, setGenerationsLeft] = useState(3);

  // Bio fields
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [achievements, setAchievements] = useState("");
  const [vibeDescription, setVibeDescription] = useState("");

  // One-sheet fields
  const [releaseTitle, setReleaseTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [releaseType, setReleaseType] = useState("single");
  const [features, setFeatures] = useState("");
  const [releaseDescription, setReleaseDescription] = useState("");

  // Promo fields
  const [promoContext, setPromoContext] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [streamingLink, setStreamingLink] = useState("");

  const handleGenerate = async () => {
    if (generationsLeft <= 0) {
      setResult(
        "⚡ You've used all 3 free generations! Upgrade to Solo ($12/mo) for unlimited access."
      );
      return;
    }

    setLoading(true);
    setResult("");
    setCopied(false);

    try {
      const payload: Record<string, string> = {
        tool: activeTool,
        tone,
        artistName,
        genre,
      };

      if (activeTool === "bio") {
        payload.achievements = achievements;
        payload.vibeDescription = vibeDescription;
      } else if (activeTool === "onesheet") {
        payload.releaseTitle = releaseTitle;
        payload.releaseDate = releaseDate;
        payload.releaseType = releaseType;
        payload.features = features;
        payload.releaseDescription = releaseDescription;
        payload.achievements = achievements;
      } else {
        payload.releaseTitle = releaseTitle;
        payload.promoContext = promoContext;
        payload.callToAction = callToAction;
        payload.streamingLink = streamingLink;
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setResult(data.content);
      setGenerationsLeft((prev) => prev - 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setResult(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = () => {
    if (!artistName || !genre) return false;
    if (activeTool === "onesheet" && !releaseTitle) return false;
    if (activeTool === "promo" && !releaseTitle) return false;
    return true;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Generate Your <span className="gold-gradient">Press Kit</span>
        </h1>
        <p className="text-brand-gray">
          {generationsLeft > 0
            ? `${generationsLeft} free generation${generationsLeft !== 1 ? "s" : ""} remaining`
            : "Upgrade for unlimited generations"}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Input Form */}
        <div className="space-y-6">
          {/* Tool Tabs */}
          <div className="flex gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id);
                  setResult("");
                }}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  activeTool === tool.id
                    ? "bg-brand-gold text-brand-black"
                    : "bg-brand-dark-gray text-brand-gray hover:text-brand-white"
                }`}
              >
                <span className="mr-1">{tool.icon}</span> {tool.label}
              </button>
            ))}
          </div>

          {/* Common Fields */}
          <div className="card space-y-4">
            <h3 className="font-bold text-lg mb-2">Artist Info</h3>
            <div>
              <label className="text-sm text-brand-gray mb-1 block">
                Artist / Band Name *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Libra Mortem"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-brand-gray mb-1 block">
                Genre / Style *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Dark Trap, Gothic Hip-Hop"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>

            {/* Bio-specific fields */}
            {(activeTool === "bio" || activeTool === "onesheet") && (
              <div>
                <label className="text-sm text-brand-gray mb-1 block">
                  Key Achievements / Credits
                </label>
                <textarea
                  className="textarea-field"
                  rows={3}
                  placeholder="e.g. 100K Spotify streams, opened for [Artist], featured on [Playlist]"
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                />
              </div>
            )}

            {activeTool === "bio" && (
              <div>
                <label className="text-sm text-brand-gray mb-1 block">
                  Vibe / Story (what makes you unique?)
                </label>
                <textarea
                  className="textarea-field"
                  rows={3}
                  placeholder="e.g. Grew up in Atlanta, blends dark visuals with hard-hitting production, inspired by horror films and southern trap"
                  value={vibeDescription}
                  onChange={(e) => setVibeDescription(e.target.value)}
                />
              </div>
            )}

            {/* One-sheet specific fields */}
            {(activeTool === "onesheet" || activeTool === "promo") && (
              <>
                <div>
                  <label className="text-sm text-brand-gray mb-1 block">
                    Release Title *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Midnight Protocol"
                    value={releaseTitle}
                    onChange={(e) => setReleaseTitle(e.target.value)}
                  />
                </div>

                {activeTool === "onesheet" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-brand-gray mb-1 block">
                          Release Date
                        </label>
                        <input
                          type="date"
                          className="input-field"
                          value={releaseDate}
                          onChange={(e) => setReleaseDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-brand-gray mb-1 block">
                          Type
                        </label>
                        <select
                          className="input-field"
                          value={releaseType}
                          onChange={(e) => setReleaseType(e.target.value)}
                        >
                          <option value="single">Single</option>
                          <option value="ep">EP</option>
                          <option value="album">Album</option>
                          <option value="mixtape">Mixtape</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-brand-gray mb-1 block">
                        Featured Artists
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. ft. Metro Boomin, 21 Savage"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-brand-gray mb-1 block">
                        Describe the Release
                      </label>
                      <textarea
                        className="textarea-field"
                        rows={3}
                        placeholder="e.g. A dark, cinematic single about navigating the music industry at night..."
                        value={releaseDescription}
                        onChange={(e) =>
                          setReleaseDescription(e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Promo-specific fields */}
            {activeTool === "promo" && (
              <>
                <div>
                  <label className="text-sm text-brand-gray mb-1 block">
                    What are you promoting?
                  </label>
                  <textarea
                    className="textarea-field"
                    rows={2}
                    placeholder="e.g. New single dropping Friday, music video premiere, upcoming show in Atlanta"
                    value={promoContext}
                    onChange={(e) => setPromoContext(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-brand-gray mb-1 block">
                    Streaming / Link URL
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. https://open.spotify.com/track/..."
                    value={streamingLink}
                    onChange={(e) => setStreamingLink(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-brand-gray mb-1 block">
                    Call to Action
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Pre-save now, Stream everywhere, Link in bio"
                    value={callToAction}
                    onChange={(e) => setCallToAction(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Tone selector */}
            <div>
              <label className="text-sm text-brand-gray mb-2 block">
                Tone / Voice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`py-2 px-3 rounded-lg text-sm transition-all ${
                      tone === t.id
                        ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
                        : "bg-brand-black text-brand-gray border border-brand-dark-gray hover:border-brand-gray"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !isFormValid()}
            className={`w-full btn-primary text-lg py-4 ${
              loading || !isFormValid()
                ? "opacity-50 cursor-not-allowed"
                : "pulse-gold"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin-slow w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              `Generate ${
                activeTool === "bio"
                  ? "Artist Bio"
                  : activeTool === "onesheet"
                  ? "One-Sheet"
                  : "Promo Pack"
              }`
            )}
          </button>
        </div>

        {/* Right: Output */}
        <div className="space-y-4">
          <div className="card min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">
                {activeTool === "bio"
                  ? "Your Artist Bio"
                  : activeTool === "onesheet"
                  ? "Your Release One-Sheet"
                  : "Your Social Promo Pack"}
              </h3>
              {result && !result.startsWith("Error") && !result.startsWith("⚡") && (
                <button
                  onClick={handleCopy}
                  className="text-sm text-brand-gold hover:text-brand-gold-light transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex-1">
              {result ? (
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-brand-gray">
                  {result}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-brand-gray/50">
                  <svg
                    className="w-16 h-16 mb-4 opacity-30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  <p className="text-sm">
                    Fill in your details and hit Generate.
                    <br />
                    Your {activeTool === "bio" ? "bio" : activeTool === "onesheet" ? "one-sheet" : "promo pack"} will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upgrade nudge */}
          {generationsLeft <= 1 && (
            <div className="card border-brand-gold/30 text-center">
              <p className="text-sm text-brand-gray mb-3">
                {generationsLeft === 0
                  ? "You've used all free generations."
                  : "1 free generation left."}
                {" "}Upgrade for unlimited.
              </p>
              <a href="/#pricing" className="btn-primary text-sm !py-2">
                Upgrade to Solo — $12/mo
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
