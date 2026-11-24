import { TaskRepository } from '@/domain/ports';
import { Task, TaskFactory } from '@/domain/task';
import { LocalStorageTaskRepository } from '@/infra/repositories';
import { EventBus } from './eventBus';
import { Feedback, TaskService } from './taskService';

const day = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
export const seedTasks = (): Task[] => [
  TaskFactory.create({ title: 'Laporan IMK Modul 10', due: day(3), priority: 3 }, 2),
  TaskFactory.create({ title: 'Latihan soal Basis Data', due: day(6), priority: 2 }),
  TaskFactory.create({ title: 'Rangkum bab Jaringan', due: day(-1), priority: 1 }, 3),
  TaskFactory.create({ title: 'Kuis Pemrograman Web', due: day(-2), priority: 3 }),
];

export interface Container { service: TaskService; bus: EventBus<Feedback> }

/** Composition root + Singleton: satu-satunya tempat dependensi konkret dirangkai (DIP). */
export function createContainer(repo: TaskRepository = new LocalStorageTaskRepository()): Container {
  const bus = new EventBus<Feedback>();
  return { bus, service: new TaskService(repo, bus, seedTasks) };
}
let instance: Container | null = null;
export const getContainer = () => (instance ??= createContainer());
