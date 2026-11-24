'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getContainer } from '@/application/container';
import { Key, Lang, dict } from '@/i18n/dictionary';
import { beep } from '@/lib/sound';

export interface Settings {
  lang: Lang; theme: 'auto' | 'light' | 'dark' | 'contrast'; fs: number; mode: 'novice' | 'expert';
  sound: boolean; volume: number; toastSec: number; bw: boolean; cb: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}
export const DEFAULTS: Settings = { lang: 'id', theme: 'auto', fs: 100, mode: 'novice', sound: false, volume: 30, toastSec: 6, bw: false, cb: 'none' };
export interface Toast { id: number; key: Key; undoable: boolean }
interface Ctx {
  t: (k: Key) => string; s: Settings; setS: (p: Partial<Settings>) => void;
  toasts: Toast[]; dismiss: (id: number) => void; status: Key;
}
const C = createContext<Ctx>(null as unknown as Ctx);
export const useApp = () => useContext(C);

export function Providers({ children }: { children: React.ReactNode }) {
  const { service, bus } = getContainer();
  const [s, setSt] = useState<Settings>(DEFAULTS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [status, setStatus] = useState<Key>('ready');
  const sRef = useRef(s); sRef.current = s;
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((a) => a.filter((x) => x.id !== id)), []);
  const setS = useCallback((p: Partial<Settings>) => {
    const next = { ...sRef.current, ...p }; sRef.current = next; setSt(next);
    try { localStorage.setItem('tugasku:settings', JSON.stringify(next)); } catch { /* abaikan */ }
  }, []);

  useEffect(() => {
    try { const r = localStorage.getItem('tugasku:settings'); if (r) setSt({ ...DEFAULTS, ...JSON.parse(r) }); } catch { /* abaikan */ }
    service.hydrate();
  }, [service]);

  useEffect(() => { // Step 10: preferensi tampilan & aksesibilitas
    const r = document.documentElement;
    r.style.fontSize = `${s.fs}%`; r.lang = s.lang;
    if (s.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', s.theme);
    document.body.classList.toggle('bw', s.bw);
    if (s.cb === 'none') r.removeAttribute('data-cb'); else r.setAttribute('data-cb', s.cb);
  }, [s]);

  useEffect(() => bus.subscribe((e) => { // Observer #1: umpan balik visual (Step 9)
    const id = ++counter.current;
    setStatus(e.key); setToasts((a) => [...a, { id, key: e.key, undoable: e.undoable }]);
    if (sRef.current.toastSec > 0) setTimeout(() => dismiss(id), sRef.current.toastSec * 1000);
  }), [bus, dismiss]);
  useEffect(() => bus.subscribe(() => { if (s.sound) beep(s.volume); }), [bus, s.sound, s.volume]); // Observer #2: bunyi opsional

  const t = useCallback((k: Key) => dict[s.lang][k], [s.lang]);
  const value = useMemo(() => ({ t, s, setS, toasts, dismiss, status }), [t, s, setS, toasts, dismiss, status]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
