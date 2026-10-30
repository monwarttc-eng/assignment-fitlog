import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';
import Img from '@/components/Img';

export default function WorkoutCard({ workout: w }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-panel transition hover:border-accent"
    >
      <Img src={w.image} alt={w.name} className="aspect-[4/3] w-full transition duration-300 group-hover:scale-[1.02]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {w.muscleGroups.map((m) => (
            <span key={m} className="rounded-full border border-accent/60 px-2.5 py-0.5 text-xs font-medium uppercase text-accent">{m}</span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-2xl uppercase leading-tight">{w.name}</h3>
        <p className="mt-1 text-sm text-neutral-400">{w.equipment}</p>
        <div className="mt-auto flex items-center gap-4 pt-4 text-sm text-neutral-300">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" />{w.duration} min</span>
          <span className="flex items-center gap-1.5"><Flame className="h-4 w-4 text-accent" />{w.calories} kcal</span>
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-accent" />{w.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
