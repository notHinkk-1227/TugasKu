'use client';
import { useSyncExternalStore } from 'react';
import { getContainer } from '@/application/container';

export function useTasks() {
  const { service } = getContainer();
  const tasks = useSyncExternalStore(service.subscribe, service.getSnapshot, service.getServerSnapshot);
  return { tasks, service };
}
