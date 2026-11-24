export type Status = 1 | 2 | 3; // 1 Belum, 2 Dikerjakan, 3 Selesai
export type Priority = 1 | 2 | 3;
export interface Task { id: string; title: string; due: string; priority: Priority; status: Status }
export interface TaskInput { title: string; due: string; priority: Priority }

export const nextStatus = (s: Status): Status => ((s % 3) + 1) as Status;
export const isLate = (t: Task, today: string) => t.due < today && t.status !== 3;

/** Factory Pattern: satu-satunya tempat Task dibuat. */
export class TaskFactory {
  static create(i: TaskInput, status: Status = 1): Task {
    return { id: crypto.randomUUID(), title: i.title.trim(), due: i.due, priority: i.priority, status };
  }
}

export type ValidationErrors = Partial<Record<'title' | 'due', 'e_name' | 'e_due'>>;
export function validate(i: Pick<TaskInput, 'title' | 'due'>): ValidationErrors {
  const e: ValidationErrors = {};
  if (i.title.trim().length < 3) e.title = 'e_name';
  if (!i.due) e.due = 'e_due';
  return e;
}
