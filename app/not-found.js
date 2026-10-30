import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-28 text-center">
      <p className="font-display text-8xl sm:text-9xl text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-wide">Rep not found</h1>
      <p className="mt-3 text-neutral-400">That page or workout doesn’t exist. Head back to the library and pick a lift.</p>
      <Link href="/" className="mt-8 inline-block rounded bg-accent px-6 py-3 font-display uppercase tracking-wider text-black hover:brightness-110">
        Back to workouts
      </Link>
    </section>
  );
}
