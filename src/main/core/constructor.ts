/**
 * Represents a type constructor.
 */
export type Constructor<T = unknown> = Function & (new (...args: any[]) => T);
