import { Draft, Fragment } from '@/types';

const FRAGMENTS_KEY = 'after-work-desk.fragments';
const DRAFTS_KEY = 'after-work-desk.drafts';

const isClient = typeof window !== 'undefined';

function parseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function loadFragments(): Fragment[] {
  if (!isClient) return [];
  return parseJSON<Fragment[]>(localStorage.getItem(FRAGMENTS_KEY), []);
}

export function saveFragments(fragments: Fragment[]) {
  if (!isClient) return;
  localStorage.setItem(FRAGMENTS_KEY, JSON.stringify(fragments));
}

export function loadDrafts(): Draft[] {
  if (!isClient) return [];
  return parseJSON<Draft[]>(localStorage.getItem(DRAFTS_KEY), []);
}

export function saveDrafts(drafts: Draft[]) {
  if (!isClient) return;
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}
