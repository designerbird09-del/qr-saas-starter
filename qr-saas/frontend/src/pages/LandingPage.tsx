import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="mx-auto mt-24 max-w-2xl text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        QR codes, <span className="text-brand-500">built for scale.</span>
      </h1>
      <p className="mt-4 text-neutral-400">
        Generate, customize, and track static and dynamic QR codes — free to start.
      </p>
      <Link
        to="/builder"
        className="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 font-medium hover:bg-brand-700"
      >
        Start building →
      </Link>
    </div>
  );
}
