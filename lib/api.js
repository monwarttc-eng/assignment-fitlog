const BASES = [
  'https://api.abcz.workers.dev/api/fitlog',
  'https://api.api-store.workers.dev/api/fitlog',
];

// Map raw API fields to a safe, consistent shape for the UI.
export function normalize(w) {
  return {
    id: Number(w.id),
    name: w.name || 'Untitled workout',
    image: w.image || '',
    muscleGroups: Array.isArray(w.muscleGroups) ? w.muscleGroups : [],
    equipment: w.equipment || '—',
    difficulty: w.difficulty || '—',
    duration: Number(w.duration) || 0,
    calories: Number(w.caloriesBurned ?? w.calories) || 0,
    sets: w.sets ?? '—',
    reps: w.reps ?? '—',
    rating: Number(w.rating) || 0,
    description: w.description || '',
    instructions: Array.isArray(w.instructions) ? w.instructions : [],
  };
}

// Try primary API, then fallback. Returns parsed JSON, or null on 404.
async function request(path = '') {
  let lastError;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('All APIs failed');
}

export async function getWorkouts() {
  const data = await request();
  if (!Array.isArray(data)) throw new Error('Unexpected API response');
  return data.map(normalize);
}

export async function getWorkout(id) {
  if (!/^\d+$/.test(String(id))) return null;
  const data = await request(`/${id}`);
  if (!data || typeof data !== 'object' || data.id == null) return null;
  return normalize(data);
}
