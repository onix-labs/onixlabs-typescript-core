/**
 * Represents a type that can be mapped using a string, like an object.
 */
export type Keyed<T = unknown> = { [key: string]: T };
