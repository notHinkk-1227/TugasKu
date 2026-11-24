/** Specification Pattern: aturan penyaringan yang dapat digabung. */
export type Spec<T> = (x: T) => boolean;
export const and = <T>(...specs: Spec<T>[]): Spec<T> => (x) => specs.every((s) => s(x));
