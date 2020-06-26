/**
 * Represents an observer of an observable.
 */
export type Observer<S, D = undefined> = (data: D, subject: S) => void;
