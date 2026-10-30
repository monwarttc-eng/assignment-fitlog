export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="FitLog logo"
            className="h-8 w-8 rounded object-contain"
          />
          <span className="font-display text-lg uppercase tracking-wide">
            FitLog
          </span>
        </div>
        <p className="text-sm text-neutral-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
