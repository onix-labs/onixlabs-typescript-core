import { Func, Func0, Func1, Func2, Func3, Func4, Func5, Func6, Func7, Func8 } from ".";

/**
 * Represents a function with any number of arguments that returns void.
 */
export type Action = Func<void>;

/**
 * Represents a function with zero arguments that returns void.
 */
export type Action0 = Func0<void>;

/**
 * Represents a function with one argument that returns void.
 */
export type Action1<T1> = Func1<T1, void>;

/**
 * Represents a function with two arguments that returns void.
 */
export type Action2<T1, T2> = Func2<T1, T2, void>;

/**
 * Represents a function with three arguments that returns void.
 */
export type Action3<T1, T2, T3> = Func3<T1, T2, T3, void>;

/**
 * Represents a function with four argumetns that returns void.
 */
export type Action4<T1, T2, T3, T4> = Func4<T1, T2, T3, T4, void>;

/**
 * Represents a function with five arguments that returns void.
 */
export type Action5<T1, T2, T3, T4, T5> = Func5<T1, T2, T3, T4, T5, void>;

/**
 * Represents a function with six arguments that returns void.
 */
export type Action6<T1, T2, T3, T4, T5, T6> = Func6<T1, T2, T3, T4, T5, T6, void>;

/**
 * Represents a function with seven arguments that returns void.
 */
export type Action7<T1, T2, T3, T4, T5, T6, T7> = Func7<T1, T2, T3, T4, T5, T6, T7, void>;

/**
 * Represents a function with eight arguments that returns void.
 */
export type Action8<T1, T2, T3, T4, T5, T6, T7, T8> = Func8<T1, T2, T3, T4, T5, T6, T7, T8, void>;
