const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try PRESSRUN with no commitment",
    features: [
      "3 total generations",
      "All 3 tools (Bio, One-Sheet, Promo)",
      "Copy to clipboard",
    ],
    cta: "Start Free",
    href: "/generate",
    highlighted: false,
  },
  {
    name: "Solo",
    price: "$12",
    period: "/month",
    description: "For independent artists dropping regularly",
    features: [
      "Unlimited generations",
      "All 3 tools",
      "Multiple tone options",
      "Copy & export as text",
      "Priority AI processing",
    ],
    cta: "Go Solo",
    href: process.env.NEXT_PUBLIC_STRIPE_SOLO_LINK || "#",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For labels, managers & power users",
    features: [
      "Everything in Solo",
      "Custom brand colors & fonts",
      "Export as PDF one-sheet",
      "Team sharing (up to 5)",
      "Bulk generation (10 at once)",
      "Priority support",
    ],
    cta: "Go Pro",
    href: process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || "#",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple pricing. <span className="gold-gradient">Real value.</span>
          </h2>
          <p className="text-brand-gray text-lg max-w-xl mx-auto">
            Stop paying $200/hr for a publicist to write what AI generates in 60
            seconds.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`card relative ${
                plan.highlighted
                  ? "border-brand-gold gold-glow"
                  : "hover:border-brand-dark-gray"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-brand-gray text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-brand-gray text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    <span className="text-brand-gray">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block text-center w-full ${
                  plan.highlighted ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
