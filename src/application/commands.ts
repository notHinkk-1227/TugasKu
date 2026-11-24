import { Task, TaskInput, nextStatus } from '@/domain/task';
import { Key } from '@/i18n/dictionary';

/** Command Pattern: setiap aksi pengguna = objek. OCP: aksi baru = kelas baru. */
export interface Command { readonly label: Key; apply(tasks: Task[]): Task[] }

export class AddTask implements Command {
  readonly label = 'saved' as const;
  constructor(private task: Task) {}
  apply(tasks: Task[]) { return [...tasks, this.task]; }
}
export class UpdateTask implements Command {
  readonly label = 'saved' as const;
  constructor(private id: string, private patch: Partial<TaskInput>) {}
  apply(tasks: Task[]) { return tasks.map((t) => (t.id === this.id ? { ...t, ...this.patch } : t)); }
}
export class AdvanceStatus implements Command {
  readonly label = 'changed' as const;
  constructor(private id: string) {}
  apply(tasks: Task[]) { return tasks.map((t) => (t.id === this.id ? { ...t, status: nextStatus(t.status) } : t)); }
}
export class RemoveTask implements Command {
  readonly label = 'deleted' as const;
  constructor(private id: string) {}
  apply(tasks: Task[]) { return tasks.filter((t) => t.id !== this.id); }
}
