import { Task } from '@/domain/task';
import { TaskRepository } from '@/domain/ports';
import { Command } from './commands';
import { EventBus } from './eventBus';
import { Key } from '@/i18n/dictionary';

export interface Feedback { key: Key; undoable: boolean }
const EMPTY: Task[] = [];

/** Facade + Observable store. SRP: mengelola state & riwayat; tidak tahu UI maupun storage (DIP). */
export class TaskService {
  private state: Task[] = EMPTY;
  private history: Task[][] = []; // Memento: snapshot untuk Undo (Step 3: semua aksi dapat dibalikkan)
  private listeners = new Set<() => void>();

  constructor(private repo: TaskRepository, private bus: EventBus<Feedback>, private seed: () => Task[]) {}

  hydrate() { this.state = this.repo.all() ?? this.seed(); this.emit(); }
  getSnapshot = () => this.state;
  getServerSnapshot = () => EMPTY;
  subscribe = (l: () => void) => { this.listeners.add(l); return () => { this.listeners.delete(l); }; };

  execute(cmd: Command) {
    this.history.push(this.state);
    this.commit(cmd.apply(this.state));
    this.bus.publish({ key: cmd.label, undoable: true });
  }
  undo() {
    const prev = this.history.pop();
    if (!prev) return this.bus.publish({ key: 'nothing', undoable: false });
    this.commit(prev);
    this.bus.publish({ key: 'undone', undoable: false });
  }
  reset() { this.history = []; this.commit(this.seed()); }

  private commit(next: Task[]) { this.state = next; this.repo.replace(next); this.emit(); }
  private emit() { this.listeners.forEach((l) => l()); }
}
