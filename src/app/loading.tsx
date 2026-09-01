export default function Loading() {
  return (
    <div className="container-edge flex min-h-dvh flex-col items-center justify-center gap-6 py-24">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-forest text-cream">
        <span className="font-script text-2xl leading-none">L</span>
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold text-muted">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-forest" />
        Plating the experience…
      </div>
    </div>
  );
}
