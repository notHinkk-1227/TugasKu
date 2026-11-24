'use client';
import { Badge } from '@/components/TaskBoard';
import { useApp } from '@/components/Providers';
import { useTasks } from '@/hooks/useTasks';
import { Status, isLate } from '@/domain/task';

export default function Statistik() {
  const { t } = useApp();
  const { tasks } = useTasks();
  const n = tasks.length, today = new Date().toISOString().slice(0, 10);
  const c = (s: Status) => tasks.filter((x) => x.status === s).length;
  const pct = (v: number) => (n ? Math.round((v / n) * 100) : 0);
  const late = tasks.filter((x) => isLate(x, today)).length;
  return (
    <>
      <h1>{t('navS')}</h1>
      <div className="grid">
        {([1, 2, 3] as Status[]).map((s) => (
          <div className="card" key={s}>
            <Badge s={s} /><p className="big-n">{c(s)}</p>
            <div className="bar-o" role="img" aria-label={`${t(`s${s}` as 's1')} ${pct(c(s))}%`}><div className="bar-i" style={{ width: `${pct(c(s))}%` }} /></div>
            <div className="hint">{pct(c(s))}%</div>
          </div>
        ))}
      </div>
      <div className="card"><h2>{t('sum')}</h2>
        <p>{t('total')}: {n}. {t('s3')}: {c(3)} ({pct(c(3))}%). {t('s2')}: {c(2)}. {t('s1')}: {c(1)}. {t('late')}: {late}.</p></div>
    </>
  );
}
