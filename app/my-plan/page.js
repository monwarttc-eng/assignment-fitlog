'use client';
import { useMemo, useState } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';
import PlanMetrics from '@/components/PlanMetrics';
import PlanCard from '@/components/PlanCard';
import EmptyState from '@/components/EmptyState';
import { SORTS, sortWorkouts } from '@/lib/utils';

export default function MyPlanPage() {
  const { status, hydrated, reload, tab, setTab, planItems, savedItems, plan, saved } = useFitlog();
  const loading = !hydrated || status === 'loading';
  const [sortBy, setSortBy] = useState('duration');
  const list = tab === 'plan' ? planItems : savedItems;
  const items = useMemo(() => sortWorkouts(list, sortBy), [list, sortBy]);
  const tabs = [
    { key: 'plan', label: 'Today’s Plan', count: plan.length },
    { key: 'saved', label: 'Saved', count: saved.length },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-5xl sm:text-6xl uppercase">My Plan</h1>
      <p className="mt-2 text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>

      <PlanMetrics />

      <div className="mt-10 flex flex-col gap-3 border-b border-line sm:flex-row sm:items-end sm:justify-between">
      <div role="tablist" className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-3 font-display text-sm sm:text-base uppercase tracking-wider transition-colors ${
              tab === t.key ? 'border-accent text-accent' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>
        <div className="relative mb-2 w-full sm:w-52">
          <label htmlFor="sort" className="sr-only">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none rounded border border-line bg-panel py-2.5 pl-4 pr-10 text-sm text-white"
          >
            {SORTS.map((o) => <option key={o.key} value={o.key}>Sort by: {o.label}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex items-center gap-3 py-16 justify-center text-neutral-400" role="status">
            <Loader2 className="h-5 w-5 animate-spin text-accent" /> Loading workouts…
          </div>
        ) : status === 'error' && (plan.length || saved.length) ? (
          <div className="py-16 text-center">
            <p className="text-neutral-300">Couldn’t load your workouts. Check your connection and try again.</p>
            <button onClick={reload} className="mt-4 rounded bg-accent px-5 py-2 font-display uppercase text-black">Retry</button>
          </div>
        ) : items.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <ul className="space-y-4">
            {items.map((w) => <PlanCard key={w.id} workout={w} mode={tab} />)}
          </ul>
        )}
      </div>
    </section>
  );
}
