export const MAX_PLAN = 5;
export const SORTS = [
  { key: 'duration', label: 'Duration', dir: 1 },
  { key: 'calories', label: 'Calories', dir: -1 },
  { key: 'rating', label: 'Rating', dir: -1 },
];
export function sortWorkouts(list, key) {
  const s = SORTS.find((x) => x.key === key) || SORTS[0];
  return [...list].sort((a, b) => (a[s.key] - b[s.key]) * s.dir);
}
