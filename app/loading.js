import { CardSkeletons } from '@/components/Skeletons';
export default function Loading() {
  return <div className="mx-auto max-w-7xl px-4 py-16"><CardSkeletons count={6} /></div>;
}
