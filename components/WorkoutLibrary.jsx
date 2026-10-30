'use client';
import { useFitlog } from '@/context/FitlogContext';
import WorkoutCard from '@/components/WorkoutCard';
import { CardSkeletons } from '@/components/Skeletons';

export default function WorkoutLibrary() {
  const { workouts, status, reload } = useFitlog();

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 pt-6">
      <div className="mb-8">
        <h2 className="font-display text-4xl uppercase sm:text-5xl">The Library</h2>
        <p className="mt-2 text-neutral-400">Twelve lifts covering every major muscle group.</p>
      </div>

      {status === 'loading' && <CardSkeletons count={6} />}

      {status === 'error' && (
        <div className="rounded-lg border border-line bg-panel p-10 text-center" role="alert">
          <p className="font-display text-2xl uppercase">Couldn’t load workouts</p>
          <p className="mt-2 text-neutral-400">Both servers are unreachable. Check your connection and try again.</p>
          <button onClick={reload} className="mt-5 rounded bg-accent px-6 py-2.5 font-display uppercase text-black hover:brightness-110">Retry</button>
        </div>
      )}

      {status === 'ready' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => <WorkoutCard key={w.id} workout={w} />)}
        </div>
      )}
    </section>
  );
}
