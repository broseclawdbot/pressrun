import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRESSRUN — AI Press Kits for Artists",
  description:
    "Your music deserves a story. Generate artist bios, release one-sheets, and social promo packs in 60 seconds with AI.",
  openGraph: {
    title: "PRESSRUN — AI Press Kits for Artists",
    description:
      "Generate artist bios, release one-sheets, and social promo packs in 60 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid-bg min-h-screen" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {/* Nav */}
        <nav className="fixed top-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-dark-gray">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center">
                <span className="text-brand-black font-bold text-sm">PR</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                PRESS<span className="text-brand-gold">RUN</span>
              </span>
            </a>
            <div className="flex items-center gap-6">
              <a
                href="/#features"
                className="text-brand-gray hover:text-brand-white transition-colors text-sm hidden sm:inline"
              >
                Features
              </a>
              <a
                href="/#pricing"
                className="text-brand-gray hover:text-brand-white transition-colors text-sm hidden sm:inline"
              >
                Pricing
              </a>
              <a href="/generate" className="btn-primary text-sm !py-2 !px-5">
                Generate Free
              </a>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="pt-[73px]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-brand-dark-gray py-8 mt-20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-brand-gray text-sm">
              &copy; 2026 PRESSRUN. Built by{" "}
              <a
                href="https://volumeentertainmentstudio.com"
                className="text-brand-gold hover:underline"
                target="_blank"
              >
                Volume Entertainment Studio
              </a>
            </p>
            <p className="text-brand-gray text-xs">
              Powered by AI &bull; Atlanta, GA
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
