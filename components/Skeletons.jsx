export function CardSkeletons({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading workouts">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-line bg-panel">
          <div className="aspect-[4/3] bg-line/60" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-1/3 rounded bg-line/60" />
            <div className="h-6 w-3/4 rounded bg-line/60" />
            <div className="h-4 w-1/2 rounded bg-line/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl animate-pulse gap-10 px-4 py-12 lg:grid-cols-2" aria-busy="true">
      <div className="aspect-[4/5] rounded-lg bg-panel" />
      <div className="space-y-4">
        <div className="h-10 w-3/4 rounded bg-panel" />
        <div className="h-4 w-full rounded bg-panel" />
        <div className="h-4 w-2/3 rounded bg-panel" />
        <div className="h-64 rounded bg-panel" />
      </div>
    </div>
  );
}
