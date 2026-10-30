'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Bookmark, CalendarPlus } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';
import { getWorkout } from '@/lib/api';
import { MAX_PLAN } from '@/lib/utils';
import Img from '@/components/Img';
import { DetailSkeleton } from '@/components/Skeletons';

export default function WorkoutDetails() {
  const { id } = useParams();
  const { workouts, status, plan, addToPlan, saveWorkout } = useFitlog();
  const [fetched, setFetched] = useState(undefined); // undefined=pending, null=missing
  const [error, setError] = useState(false);

  const numId = Number(id);
  const fromList = workouts.find((w) => w.id === numId);

  // Reuse list data; only hit the single-item endpoint if it isn't in the list.
  useEffect(() => {
    if (fromList || status === 'loading') return;
    let live = true;
    getWorkout(id)
      .then((w) => live && setFetched(w))
      .catch(() => live && setError(true));
    return () => { live = false; };
  }, [id, fromList, status]);

  const w = fromList || fetched;
  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-display text-3xl uppercase">Couldn’t load this workout</p>
        <Link href="/" className="mt-6 inline-block rounded bg-accent px-6 py-2.5 font-display uppercase text-black">Back to workouts</Link>
      </div>
    );
  }
  if (!w && fetched === null) notFound();
  if (!w) return <DetailSkeleton />;

  const inPlan = plan.includes(w.id);
  const full = plan.length >= MAX_PLAN && !inPlan;
  const specs = [
    ['Equipment', w.equipment],
    ['Difficulty', w.difficulty],
    ['Sets', w.sets],
    ['Reps', w.reps],
    ['Duration', `${w.duration} min`],
    ['Calories', `${w.calories} kcal`],
    ['Rating', w.rating.toFixed(1)],
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to library
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-line lg:sticky lg:top-24 lg:self-start">
          <Img src={w.image} alt={w.name} className="aspect-[4/5] w-full" />
        </div>

        <div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">{w.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {w.muscleGroups.map((m) => (
              <span key={m} className="rounded-full border border-accent/60 px-3 py-0.5 text-xs font-medium uppercase text-accent">{m}</span>
            ))}
          </div>
          {w.description && <p className="mt-5 text-lg text-neutral-300">{w.description}</p>}

          <h2 className="mt-8 font-display text-2xl uppercase">Key Specifications</h2>
          <dl className="mt-3 divide-y divide-line rounded-lg border border-line bg-panel">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-3">
                <dt className="text-neutral-400">{k}</dt>
                <dd className="font-medium text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 font-display text-2xl uppercase">Instructions</h2>
          {w.instructions.length ? (
            <ol className="mt-3 space-y-3">
              {w.instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">{i + 1}</span>
                  <span className="text-neutral-300">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-neutral-400">No instructions are available for this workout yet.</p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(w)}
              disabled={full}
              className="flex flex-1 items-center justify-center gap-2 rounded bg-accent px-6 py-3.5 font-display uppercase tracking-wider text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CalendarPlus className="h-5 w-5" /> Add to today’s plan
            </button>
            <button
              onClick={() => saveWorkout(w)}
              className="flex flex-1 items-center justify-center gap-2 rounded border border-accent px-6 py-3.5 font-display uppercase tracking-wider text-accent hover:bg-accent/10"
            >
              <Bookmark className="h-5 w-5" /> Save for later
            </button>
          </div>
          {full && <p className="mt-3 text-sm text-neutral-400">Today’s plan is full (five lifts). Remove one to add another.</p>}
        </div>
      </div>
    </section>
  );
}
