import { Task } from './task';
/** ISP: antarmuka kecil; DIP: service hanya bergantung pada abstraksi ini. */
export interface TaskReader { all(): Task[] | null }
export interface TaskWriter { replace(tasks: Task[]): void }
export type TaskRepository = TaskReader & TaskWriter;
