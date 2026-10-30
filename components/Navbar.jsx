"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, ListChecks, Bookmark } from "lucide-react";
import { useFitlog } from "@/context/FitlogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, setTab } = useFitlog();
  const link = (active) =>
    `px-2 sm:px-3 py-2 font-display text-sm sm:text-base uppercase tracking-wider transition-colors ${
      active ? "text-accent" : "text-neutral-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog home"
        >
          <img
            src="/images/logo.png"
            alt="FitLog logo"
            className="h-8 w-8 rounded object-contain"
          />
          <span className="hidden font-display text-xl uppercase tracking-wide sm:inline">
            FitLog
          </span>
        </Link>

        <div className="flex items-center">
          <Link
            href="/"
            className={link(
              pathname === "/" || pathname.startsWith("/workout"),
            )}
          >
            Workout
          </Link>
          <Link href="/my-plan" className={link(pathname === "/my-plan")}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            onClick={() => setTab("plan")}
            aria-label={`Today's plan, ${plan.length} items`}
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-black hover:brightness-110"
          >
            <ListChecks className="h-4 w-4" />
            <span className="hidden sm:inline">Plan</span>
            <span>{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setTab("saved")}
            aria-label={`Saved, ${saved.length} items`}
            className="flex items-center gap-1.5 rounded-full border border-accent px-3 py-1.5 text-sm font-semibold text-accent hover:bg-accent/10"
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Saved</span>
            <span>{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
