/**
 * Represents a type that can be indexed using a number, like an array.
 */
export type Indexed<T = unknown> = { [index: number]: T };
