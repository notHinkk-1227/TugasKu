'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getContainer } from '@/application/container';
import { Icon } from './Icon';
import { Modal } from './Modal';
import { useApp } from './Providers';

const NAV = [
  { href: '/', icon: 'list', k: 'navT' }, { href: '/statistik', icon: 'chart', k: 'navS' },
  { href: '/pengaturan', icon: 'gear', k: 'navP' }, { href: '/panduan', icon: 'doc', k: 'navD' },
] as const;
const TYPING = /INPUT|TEXTAREA|SELECT/;

export function Shell({ children }: { children: React.ReactNode }) {
  const { t, s, toasts, dismiss, status } = useApp();
  const path = usePathname(); const router = useRouter();
  const [help, setHelp] = useState(false);
  const cur = NAV.find((n) => n.href === path) ?? NAV[0];

  useEffect(() => { // Step 4 & 10: pintasan keyboard
    const onKey = (e: KeyboardEvent) => {
      const typing = TYPING.test((document.activeElement as HTMLElement | null)?.tagName ?? '');
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === 'z' && !typing) { e.preventDefault(); getContainer().service.undo(); }
        return;
      }
      if (e.altKey || typing || document.querySelector('dialog[open]')) return;
      if (e.key === 'n') { router.push('/'); setTimeout(() => window.dispatchEvent(new Event('tugasku:new')), 80); }
      else if (e.key === '/') { e.preventDefault(); router.push('/'); setTimeout(() => document.getElementById('q')?.focus(), 80); }
      else if (e.key === '?') setHelp(true);
      else if (e.key >= '1' && e.key <= '4') router.push(NAV[Number(e.key) - 1].href);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="cb-pro" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0.152 1.053 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0" /></filter>
        <filter id="cb-deu" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0" /></filter>
        <filter id="cb-tri" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0" /></filter>
      </svg>
      <a className="skip" href="#main">{t('skip')}</a>
      <div className="app">
        <aside className="side">
          <div className="brand"><span className="logo"><Icon n="book" size={22} /></span>TugasKu</div>
          <nav aria-label="Menu utama">
            {NAV.map((n, i) => (
              <Link key={n.href} href={n.href} aria-current={n.href === cur.href ? 'page' : undefined}>
                <span className="ni"><Icon n={n.icon} size={18} /></span><span>{t(n.k)}</span>
                {s.mode === 'expert' && <kbd>{i + 1}</kbd>}
              </Link>
            ))}
          </nav>
          <button className="helpbtn" onClick={() => setHelp(true)} aria-label={t('help')}><Icon n="help" /><span>{t('help')}</span></button>
        </aside>
        <div className="content">
          <div className="crumb" aria-label={t('here')}>{t('home')} › <b>{t(cur.k)}</b></div>
          <main id="main" tabIndex={-1}>{children}</main>
          <footer className="status" role="status" aria-live="polite"><Icon n="info" size={16} />{t(status)}</footer>
        </div>
      </div>
      <div className="toasts">
        {toasts.map((x) => (
          <div className="toast" key={x.id}>
            <span>{t(x.key)}</span>
            <span className="acts">
              {x.undoable && <button onClick={() => { getContainer().service.undo(); dismiss(x.id); }}><Icon n="undo" size={16} />{t('undo')}</button>}
              <button aria-label={t('close')} onClick={() => dismiss(x.id)}><Icon n="x" size={16} /></button>
            </span>
          </div>
        ))}
      </div>
      <Modal open={help} onClose={() => setHelp(false)} title={t('help')} icon="help">
        <p>{t('helpb')}</p>
        <p>{t('shorts')}: <kbd>N</kbd> {t('add')} · <kbd>/</kbd> {t('search')} · <kbd>Ctrl+Z</kbd> {t('undo')} · <kbd>1</kbd>–<kbd>4</kbd> menu · <kbd>?</kbd> {t('help')}</p>
        <div className="dact"><button className="pri" onClick={() => setHelp(false)}>{t('close')}</button></div>
      </Modal>
    </>
  );
}
