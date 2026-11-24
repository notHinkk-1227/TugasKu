/** Observer Pattern: publisher tidak tahu siapa subscriber-nya. */
export class EventBus<E> {
  private subs = new Set<(e: E) => void>();
  subscribe(fn: (e: E) => void) { this.subs.add(fn); return () => { this.subs.delete(fn); }; }
  publish(e: E) { this.subs.forEach((fn) => fn(e)); }
}
