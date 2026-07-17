import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Builder", to: "/builder" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Features", to: "/#features" },
      { label: "Showcase", to: "/#showcase" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", to: "/login" },
      { label: "Sign up", to: "/register" },
      { label: "Support", to: "/pricing" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/20 px-6 py-10 text-sm text-neutral-400 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="text-base font-semibold tracking-tight text-white">
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">QRSO</span>
            </Link>
            <p className="mt-3 text-neutral-500">
              Create, customize, and track QR codes with a fast and polished experience for modern teams.
            </p>
          </div>

          <div className="grid flex-1 gap-6 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-300">{section.title}</h3>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {year} QRSO. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#showcase" className="transition hover:text-white">Showcase</a>
            <Link to="/pricing" className="transition hover:text-white">Pricing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
