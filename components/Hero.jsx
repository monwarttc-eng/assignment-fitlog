"use client";
import { ArrowDown } from "lucide-react";
import Img from "@/components/Img";

export default function Hero() {
  const scrollToLibrary = () =>
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          Workout Library
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[1.02] sm:text-6xl lg:text-7xl">
          Train with intent. <span className="text-accent">Log every set.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today’s plan, and watch the week’s work add up.
        </p>
        <button
          onClick={scrollToLibrary}
          className="mt-8 inline-flex items-center gap-2 rounded bg-accent px-7 py-3.5 font-display text-lg uppercase tracking-wider text-black transition hover:brightness-110"
        >
          Browse workouts <ArrowDown className="h-5 w-5" />
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-line">
        <Img
          src="/images/hero.png"
          alt="Fitness illustration"
          className="aspect-[4/4] w-full"
        />
      </div>
    </section>
  );
}
