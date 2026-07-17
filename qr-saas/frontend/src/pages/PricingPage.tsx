import { Link } from "react-router-dom";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Great for personal use and quick QR codes.",
    cta: "Get Started",
    href: "/builder",
    features: [
      "Unlimited static QR codes",
      "Instant online generation",
      "PNG download",
      "Basic color customization",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/ month",
    description: "For creators and small businesses.",
    cta: "Start Free Trial",
    href: "/register",
    highlighted: true,
    features: [
      "Everything in Free",
      "Dynamic QR codes (editable destination)",
      "Scan analytics & logs",
      "Custom colors, shapes & logo",
      "Folder & tag organization",
      "Email support",
    ],
  },
  {
    name: "Business",
    price: "$39",
    period: "/ month",
    description: "For teams that need more scale and control.",
    cta: "Contact Sales",
    href: "/register",
    features: [
      "Everything in Pro",
      "Batch QR generation",
      "Team members & roles",
      "API access",
      "SSO & audit logs",
      "Priority support",
    ],
  },
];

export function PricingPage() {
  return (
    <div className="mx-auto mt-12 max-w-5xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Simple, transparent pricing</h1>
        <p className="mt-4 text-neutral-400">Start free and upgrade when you need more power.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 ${
              plan.highlighted
                ? "border-gray-500 bg-white/[0.04] shadow-[0_0_30px_rgba(200,200,200,0.08)]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-1 text-2xl font-bold">
              {plan.price} <span className="text-sm font-normal text-neutral-400">{plan.period}</span>
            </p>
            <p className="mt-2 text-sm text-neutral-400">{plan.description}</p>

            <Link
              to={plan.href}
              className={`mt-6 block w-full rounded-xl py-2.5 text-center text-sm font-medium ${
                plan.highlighted
                  ? "bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] text-[#1a0f0a] shadow-[0_0_15px_rgba(200,140,100,0.25)] hover:shadow-[0_0_30px_rgba(255,180,140,0.45)] hover:brightness-110 active:scale-95 transition-all duration-300"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {plan.cta}
            </Link>

            <ul className="mt-6 space-y-2 text-sm text-neutral-300">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                   <span className="mt-0.5 text-neutral-400">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <h3 className="text-xl font-semibold">Need a custom plan?</h3>
        <p className="mt-2 text-sm text-neutral-400">Enterprise features like SSO, dedicated support, and volume licensing are available.</p>
         <Link to="/register" className="mt-4 inline-block rounded-xl bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] px-6 py-2.5 text-sm font-medium text-[#1a0f0a] shadow-[0_0_15px_rgba(200,140,100,0.25)] hover:shadow-[0_0_30px_rgba(255,180,140,0.45)] hover:brightness-110 active:scale-95 transition-all duration-300">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
