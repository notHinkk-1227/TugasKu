'use client';
import { useEffect, useMemo, useState } from 'react';
import { AddTask, AdvanceStatus, RemoveTask, UpdateTask } from '@/application/commands';
import { SortKey, select } from '@/application/strategies';
import { useTasks } from '@/hooks/useTasks';
import { Status, Task, TaskFactory, TaskInput, isLate } from '@/domain/task';
import { Icon } from './Icon';
import { Modal } from './Modal';
import { useApp } from './Providers';
import { TaskForm } from './TaskForm';

const ICON = { 1: 'todo', 2: 'prog', 3: 'done' } as const;
const STATUSES: Status[] = [1, 2, 3];
export const Badge = ({ s }: { s: Status }) => {
  const { t } = useApp();
  return <span className={`bd b${s}`}><Icon n={ICON[s]} size={16} />{t(`s${s}` as 's1')}</span>;
};

export function TaskBoard() {
  const { t, s } = useApp();
  const { tasks, service } = useTasks();
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<SortKey>('due');
  const [form, setForm] = useState<Task | 'new' | null>(null);
  const [del, setDel] = useState<Task | null>(null);
  const today = new Date().toISOString().slice(0, 10);
  const fmt = useMemo(() => new Intl.DateTimeFormat(s.lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }), [s.lang]);
  const list = useMemo(() => select(tasks, filter, q, sort), [tasks, filter, q, sort]);
  const count = (st: Status) => tasks.filter((x) => x.status === st).length;
  const done = count(3);
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  useEffect(() => { const open = () => setForm('new'); window.addEventListener('tugasku:new', open); return () => window.removeEventListener('tugasku:new', open); }, []);

  const submit = (i: TaskInput) => {
    if (form === 'new') service.execute(new AddTask(TaskFactory.create(i)));
    else if (form) service.execute(new UpdateTask(form.id, i));
    setForm(null);
  };

  return (
    <>
      <section className="hero" aria-label={t('total')}>
        <div>
          <h1>{t('navT')}</h1>
          <p>{done} / {tasks.length} {t('done')}</p>
          <div className="hchips">
            {STATUSES.map((st) => <span className="hchip" key={st}><Icon n={ICON[st]} size={16} />{t(`s${st}` as 's1')} · {count(st)}</span>)}
          </div>
          <button className="add" onClick={() => setForm('new')}><Icon n="plus" />{t('add')}{s.mode === 'expert' && <kbd>N</kbd>}</button>
        </div>
        <svg width="104" height="104" viewBox="0 0 72 72" role="img" aria-label={`${pct}%`}>
          <circle cx="36" cy="36" r="28" className="ring-bg" />
          <circle cx="36" cy="36" r="28" className="ring" strokeDasharray={`${(pct / 100) * 175.9} 175.9`} transform="rotate(-90 36 36)" />
          <text x="36" y="41" textAnchor="middle" className="ring-t">{pct}%</text>
        </svg>
      </section>

      <div className="toolbar">
        <div><label htmlFor="q">{t('search')}{s.mode === 'expert' && <> <kbd>/</kbd></>}</label>
          <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div><label htmlFor="so">{t('sort')}</label>
          <select id="so" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="due">{t('sdue')}</option><option value="priority">{t('sprio')}</option></select></div>
      </div>
      <div className="seg" role="group" aria-label="Filter">
        {(['all', 1, 2, 3] as const).map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            <Icon n={f === 'all' ? 'list' : ICON[f]} size={16} />{f === 'all' ? t('all') : t(`s${f}` as 's1')}
          </button>
        ))}
      </div>
      <p className="hint" aria-live="polite">{list.length} {t('count')}</p>

      {list.length === 0 ? (
        <div className="empty"><span className="logo"><Icon n="book" size={26} /></span><p>{t('empty')}</p></div>
      ) : (
        <ul className="l">
          {list.map((x) => {
            const late = isLate(x, today);
            return (
              <li key={x.id} className={`t s${x.status}`}>
                <div>
                  <button className="tt" title={t('edit')} onClick={() => setForm(x)}>{x.title}</button>
                  <div className="meta">
                    <span className={`chip${late ? ' bad' : ''}`}><Icon n="cal" size={14} />{fmt.format(new Date(`${x.due}T00:00:00`))}{late && ` · ${t('late')}`}</span>
                    <span className={`chip${x.priority === 3 ? ' bad' : ''}`}><Icon n="flag" size={14} />{t(`p${x.priority}` as 'p1')}</span>
                  </div>
                </div>
                <div className="acts">
                  <Badge s={x.status} />
                  <button title={t('changed')} aria-label={`${t('changed')} ${x.title}`} onClick={() => service.execute(new AdvanceStatus(x.id))}>
                    <Icon n="next" size={16} />{t(`s${(x.status % 3) + 1}` as 's1')}</button>
                  <button aria-label={`${t('del')}: ${x.title}`} title={t('del')} onClick={() => setDel(x)}><Icon n="trash" size={18} /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Modal open={form !== null} onClose={() => setForm(null)} title={form === 'new' ? t('add') : t('edit')} icon={form === 'new' ? 'plus' : 'edit'}>
        {form !== null && <TaskForm initial={form === 'new' ? undefined : form} onSubmit={submit} onCancel={() => setForm(null)} />}
      </Modal>
      <Modal open={del !== null} onClose={() => setDel(null)} title={t('cdel')} icon="warn">
        <p><b>{del?.title}</b><br />{t('cdelt')}</p>
        <div className="dact">
          <button autoFocus onClick={() => setDel(null)}>{t('cancel')}</button>
          <button className="pri" onClick={() => { if (del) service.execute(new RemoveTask(del.id)); setDel(null); }}>{t('del')}</button>
        </div>
      </Modal>
    </>
  );
}
