'use client';
import { useState } from 'react';
import { Priority, Task, TaskInput, validate } from '@/domain/task';
import { useApp } from './Providers';

/** Step 7: caption jelas, radio untuk pilihan terbatas, tombol Simpan nonaktif sampai valid, galat spesifik. */
export function TaskForm({ initial, onSubmit, onCancel }: {
  initial?: Task; onSubmit: (i: TaskInput) => void; onCancel: () => void;
}) {
  const { t } = useApp();
  const [title, setTitle] = useState(initial?.title ?? '');
  const [due, setDue] = useState(initial?.due ?? '');
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 2);
  const [touched, setTouched] = useState({ title: false, due: false });
  const errs = validate({ title, due });
  const invalid = Object.keys(errs).length > 0;
  const touch = (k: 'title' | 'due') => setTouched((o) => ({ ...o, [k]: true }));

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (!invalid) onSubmit({ title: title.trim(), due, priority }); }}>
      <label htmlFor="fn">{t('name')}</label>
      <input id="fn" autoFocus autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => touch('title')}
        aria-invalid={touched.title && !!errs.title} aria-describedby="en" />
      <div className="err" id="en">{touched.title && errs.title ? t(errs.title) : ''}</div>

      <label htmlFor="fd">{t('due')}</label>
      <input id="fd" type="date" value={due} onChange={(e) => setDue(e.target.value)} onBlur={() => touch('due')}
        aria-invalid={touched.due && !!errs.due} aria-describedby="ed" />
      <div className="err" id="ed">{touched.due && errs.due ? t(errs.due) : ''}</div>

      <div className="cap" id="pl">{t('prio')}</div>
      <div className="rg" role="radiogroup" aria-labelledby="pl">
        {([1, 2, 3] as Priority[]).map((p) => (
          <label key={p}><input type="radio" name="prio" checked={priority === p} onChange={() => setPriority(p)} />{t(`p${p}` as 'p1')}</label>
        ))}
      </div>
      {invalid && <p className="hint">{t('savehint')}</p>}
      <div className="dact">
        <button type="button" onClick={onCancel}>{t('cancel')}</button>
        <button className="pri" disabled={invalid}>{t('save')}</button>
      </div>
    </form>
  );
}
