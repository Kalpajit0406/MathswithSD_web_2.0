import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f1ea] text-[#141311] px-6 text-center">
      <h1 className="font-display text-6xl font-bold tracking-tight text-ink">404</h1>
      <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
        Page Not Found
      </h2>
      <p className="mt-2 text-sm text-ink/70 max-w-md">
        The classroom page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-full bg-ink px-6 py-2.5 font-display text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Return to Home
      </Link>
    </div>
  );
}
