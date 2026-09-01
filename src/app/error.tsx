"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-edge flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="font-script text-5xl font-bold text-forest">LaSabroso</span>
      <h1 className="text-2xl font-bold text-forest">Something simmered over.</h1>
      <p className="max-w-md text-sm text-muted">
        We hit an unexpected snag. Try again, or head back to the menu.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-forest/25 px-5 py-2.5 text-sm font-bold text-forest"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
