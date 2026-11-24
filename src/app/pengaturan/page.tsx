'use client';
import { useState } from 'react';
import { DEFAULTS, Settings, useApp } from '@/components/Providers';
import { Modal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { useTasks } from '@/hooks/useTasks';
import { Key } from '@/i18n/dictionary';

export default function Pengaturan() {
  const { t, s, setS } = useApp();
  const { service } = useTasks();
  const [ask, setAsk] = useState(false);
  const opts = (xs: [string, Key][]) => xs.map(([v, k]) => <option key={v} value={v}>{t(k)}</option>);
  return (
    <>
      <h1>{t('navP')}</h1>
      <div className="card grid">
        <div><label htmlFor="a">{t('lang')}</label>
          <select id="a" value={s.lang} onChange={(e) => setS({ lang: e.target.value as Settings['lang'] })}><option value="id">Bahasa Indonesia</option><option value="en">English</option></select></div>
        <div><label htmlFor="b">{t('theme')}</label>
          <select id="b" value={s.theme} onChange={(e) => setS({ theme: e.target.value as Settings['theme'] })}>{opts([['auto', 'auto'], ['light', 'light'], ['dark', 'dark'], ['contrast', 'contrast']])}</select></div>
        <div><label htmlFor="c">{t('fs')}: {s.fs}%</label>
          <input id="c" type="range" min={85} max={150} step={5} value={s.fs} onChange={(e) => setS({ fs: Number(e.target.value) })} /></div>
        <div><label htmlFor="d">{t('mode')}</label>
          <select id="d" value={s.mode} onChange={(e) => setS({ mode: e.target.value as Settings['mode'] })}>{opts([['novice', 'novice'], ['expert', 'expert']])}</select></div>
        <div><label htmlFor="e">{t('tdur')}</label>
          <input id="e" type="number" min={0} max={60} value={s.toastSec} onChange={(e) => setS({ toastSec: Math.max(0, Number(e.target.value)) })} /></div>
      </div>
      <div className="card">
        <label className="rg"><input type="checkbox" checked={s.sound} onChange={(e) => setS({ sound: e.target.checked })} />{t('sound')}</label>
        <label htmlFor="v">{t('volume')}: {s.volume}%</label>
        <input id="v" type="range" min={5} max={100} value={s.volume} onChange={(e) => setS({ volume: Number(e.target.value) })} style={{ maxWidth: 260 }} />
        <label htmlFor="cb">{t('cb')}</label>
        <select id="cb" value={s.cb} onChange={(e) => setS({ cb: e.target.value as Settings['cb'] })}>
          {opts([['none', 'cbnone'], ['protanopia', 'cbpro'], ['deuteranopia', 'cbdeu'], ['tritanopia', 'cbtri']])}
        </select>
        <p className="hint">{t('cbnote')}</p>
        <label className="rg"><input type="checkbox" checked={s.bw} onChange={(e) => setS({ bw: e.target.checked })} />{t('bw')}</label>
      </div>
      <button onClick={() => setAsk(true)}><Icon n="trash" />{t('reset')}</button>
      <Modal open={ask} onClose={() => setAsk(false)} title={t('resetq')} icon="warn">
        <div className="dact"><button autoFocus onClick={() => setAsk(false)}>{t('cancel')}</button>
          <button className="pri" onClick={() => { service.reset(); setS(DEFAULTS); setAsk(false); }}>{t('resetb')}</button></div>
      </Modal>
    </>
  );
}
