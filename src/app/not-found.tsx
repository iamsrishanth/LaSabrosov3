import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-edge flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="font-script text-6xl font-bold text-forest">404</span>
      <h1 className="text-2xl font-bold text-forest">This table isn’t set.</h1>
      <p className="max-w-md text-sm text-muted">
        The page you’re after has moved or never existed.
      </p>
      <Link
        href="/"
        className="rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream"
      >
        Back home
      </Link>
    </div>
  );
}
