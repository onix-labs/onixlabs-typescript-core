import { Constructor } from ".";

/**
 * Represents a prototype; that is a primitive or instance that inherits the prototype.
 */
export type Prototype<T = unknown> = T extends Constructor ? never : T & {
    readonly constructor: Function;
    toString(): string;
};
