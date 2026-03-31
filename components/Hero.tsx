export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32 text-center relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-dark border border-brand-dark-gray rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
          <span className="text-brand-gray text-sm">
            AI-powered press kits for independent artists
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Your music deserves
          <br />
          <span className="gold-gradient">a story.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop spending hours writing bios and press releases.
          <br className="hidden sm:block" />
          PRESSRUN generates artist bios, release one-sheets, and social promo
          packs in <strong className="text-brand-white">60 seconds</strong>.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="/generate" className="btn-primary text-lg pulse-gold">
            Generate Your Press Kit — Free
          </a>
          <a href="#pricing" className="btn-secondary text-lg">
            See Pricing
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-brand-gray text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-brand-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-brand-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            <span>3 free generations</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-brand-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            <span>Built for independent artists</span>
          </div>
        </div>
      </div>
    </section>
  );
}
