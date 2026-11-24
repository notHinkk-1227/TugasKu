import { TaskRepository } from '@/domain/ports';
import { Task } from '@/domain/task';

/** Repository Pattern. LSP: kedua repository dapat saling menggantikan. */
export class LocalStorageTaskRepository implements TaskRepository {
  constructor(
    private key = 'tugasku:tasks',
    private storage: Storage | undefined = typeof window !== 'undefined' ? window.localStorage : undefined,
  ) {}
  all(): Task[] | null {
    try { const raw = this.storage?.getItem(this.key); return raw ? (JSON.parse(raw) as Task[]) : null; }
    catch { return null; }
  }
  replace(tasks: Task[]): void {
    try { this.storage?.setItem(this.key, JSON.stringify(tasks)); } catch { /* penyimpanan penuh/diblokir */ }
  }
}

export class MemoryTaskRepository implements TaskRepository {
  private data: Task[] | null = null;
  all() { return this.data; }
  replace(tasks: Task[]) { this.data = tasks; }
}
