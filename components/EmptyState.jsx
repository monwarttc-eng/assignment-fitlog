import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function EmptyState({ tab }) {
  const text = tab === 'saved'
    ? 'Nothing saved yet. Browse the library and save a lift for later.'
    : 'Browse the library and add a lift to get today moving.';
  return (
    <div className="rounded-lg border border-dashed border-line px-6 py-16 text-center">
      <h2 className="font-display text-4xl uppercase">Nothing here yet</h2>
      <p className="mx-auto mt-2 max-w-md text-neutral-400">{text}</p>
      <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-display uppercase tracking-wider text-black hover:brightness-110">
        <Dumbbell className="h-5 w-5" /> Go to workouts
      </Link>
    </div>
  );
}
