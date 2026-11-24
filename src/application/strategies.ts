import { Status, Task } from '@/domain/task';
import { Spec, and } from '@/domain/specification';

/** Strategy Pattern: algoritma pengurutan dapat ditukar (OCP). */
export type Comparator = (a: Task, b: Task) => number;
export const sorters = {
  due: ((a, b) => a.due.localeCompare(b.due)) as Comparator,
  priority: ((a, b) => b.priority - a.priority || a.due.localeCompare(b.due)) as Comparator,
};
export type SortKey = keyof typeof sorters;

export const byStatus = (s: 'all' | Status): Spec<Task> => (t) => s === 'all' || t.status === s;
export const byQuery = (q: string): Spec<Task> => (t) => t.title.toLowerCase().includes(q.trim().toLowerCase());

export const select = (tasks: Task[], status: 'all' | Status, q: string, sort: SortKey) =>
  tasks.filter(and(byStatus(status), byQuery(q))).sort(sorters[sort]);
