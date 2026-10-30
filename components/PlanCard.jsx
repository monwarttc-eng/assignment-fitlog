"use client";
import Link from "next/link";
import { Check, Clock, Eye, Flame, Star, X } from "lucide-react";
import { useFitlog } from "@/context/FitlogContext";
import Img from "@/components/Img";

export default function PlanCard({ workout: w, mode }) {
  const { done, markDone, removeFromPlan, removeSaved } = useFitlog();
  const isPlan = mode === "plan";
  const isDone = isPlan && done.includes(w.id);

  return (
    <li
      className={`flex flex-col gap-4 rounded-lg border bg-panel p-4 sm:flex-row sm:items-center ${isDone ? "border-accent/50" : "border-line"}`}
    >
      <Img
        src={w.image}
        alt={w.name}
        className={`h-32 w-full rounded sm:h-24 sm:w-32 ${isDone ? "opacity-50" : ""}`}
      />
      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-xl uppercase ${isDone ? "text-neutral-500 line-through" : ""}`}
        >
          {w.name}
        </h3>
        <p className="text-sm text-neutral-400">{w.equipment}</p>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-300">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {w.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-accent" />
            {w.calories} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-accent" />
            {w.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${w.id}`}
          className="flex items-center gap-1.5 rounded border border-line px-3 py-2 text-sm hover:border-accent hover:text-accent"
        >
          <Eye className="h-4 w-4" /> View Details
        </Link>
        {isPlan && (
          <button
            onClick={() => markDone(w)}
            disabled={isDone}
            className="flex items-center gap-1.5 rounded bg-accent px-3 py-2 text-sm font-semibold text-black hover:brightness-110 disabled:cursor-default disabled:opacity-50"
          >
            <Check className="h-4 w-4" /> {isDone ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={() => (isPlan ? removeFromPlan(w) : removeSaved(w))}
          aria-label={`Remove ${w.name}`}
          className="rounded border border-line p-2 text-neutral-400 hover:border-red-400 hover:text-red-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
