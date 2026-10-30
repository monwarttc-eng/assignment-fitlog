'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { getWorkouts } from '@/lib/api';
import { MAX_PLAN } from '@/lib/utils';

const Ctx = createContext(null);
const KEYS = { plan: 'fitlog:plan', saved: 'fitlog:saved', done: 'fitlog:done' };

function read(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function FitlogProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [tab, setTab] = useState('plan');
  const [hydrated, setHydrated] = useState(false);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      setWorkouts(await getWorkouts());
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Load from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    setPlan(read(KEYS.plan));
    setSaved(read(KEYS.saved));
    setDone(read(KEYS.done));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEYS.plan, JSON.stringify(plan));
    localStorage.setItem(KEYS.saved, JSON.stringify(saved));
    localStorage.setItem(KEYS.done, JSON.stringify(done));
  }, [plan, saved, done, hydrated]);

  const byId = useCallback((id) => workouts.find((w) => w.id === id), [workouts]);

  const addToPlan = (w) => {
    if (plan.includes(w.id)) return toast('Already in today’s plan', { icon: 'ℹ️' });
    if (plan.length >= MAX_PLAN) return toast.error('Plan is full — five lifts max');
    setPlan([...plan, w.id]);
    toast.success(`${w.name} added to today’s plan`);
  };
  const saveWorkout = (w) => {
    if (saved.includes(w.id)) return toast('Already saved', { icon: 'ℹ️' });
    setSaved([...saved, w.id]);
    toast.success(`${w.name} saved for later`);
  };
  const removeFromPlan = (w) => {
    setPlan(plan.filter((i) => i !== w.id));
    setDone(done.filter((i) => i !== w.id));
    toast(`${w.name} removed from plan`, { icon: '🗑️' });
  };
  const removeSaved = (w) => {
    setSaved(saved.filter((i) => i !== w.id));
    toast(`${w.name} removed from saved`, { icon: '🗑️' });
  };
  const markDone = (w) => {
    if (done.includes(w.id)) return toast('Already completed', { icon: 'ℹ️' });
    setDone([...done, w.id]);
    toast.success(`${w.name} marked as done`);
  };

  const planItems = useMemo(() => plan.map(byId).filter(Boolean), [plan, byId]);
  const savedItems = useMemo(() => saved.map(byId).filter(Boolean), [saved, byId]);

  const value = {
    workouts, status, reload: load, hydrated,
    plan, saved, done, planItems, savedItems, tab, setTab,
    addToPlan, saveWorkout, removeFromPlan, removeSaved, markDone,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useFitlog = () => useContext(Ctx);
