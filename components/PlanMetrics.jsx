'use client';
import { Dumbbell, Clock, Flame } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';

export default function PlanMetrics() {
  const { planItems, savedItems, tab } = useFitlog();
  const items = tab === 'saved' ? savedItems : planItems;
  const stats = [
    { label: 'Exercises', value: items.length, icon: Dumbbell },
    { label: 'Minutes', value: items.reduce((s, w) => s + w.duration, 0), icon: Clock },
    { label: 'Calories', value: items.reduce((s, w) => s + w.calories, 0), icon: Flame },
  ];
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex items-center justify-between rounded-lg border border-line bg-panel p-5">
          <div>
            <p className="text-sm text-neutral-400">{label}</p>
            <p className="mt-1 font-display text-4xl text-accent">{value}</p>
          </div>
          <Icon className="h-8 w-8 text-neutral-600" />
        </div>
      ))}
    </div>
  );
}
