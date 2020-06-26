/**
 * Represents a function with any number of arguments.
 */
export type Func<R> = (...args: any[]) => R;

/**
 * Represents a function with zero arguments.
 */
export type Func0<R> = () => R;

/**
 * Represents a function with one argument.
 */
export type Func1<T1, R> = (arg1: T1) => R;

/**
 * Represents a function with two arguments.
 */
export type Func2<T1, T2, R> = (arg1: T1, arg2: T2) => R;

/**
 * Represents a function with three arguments.
 */
export type Func3<T1, T2, T3, R> = (arg1: T1, arg2: T2, arg3: T3) => R;

/**
 * Represents a function with four arguments.
 */
export type Func4<T1, T2, T3, T4, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R;

/**
 * Represents a function with five arguments.
 */
export type Func5<T1, T2, T3, T4, T5, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R;

/**
 * Represents a function with six arguments.
 */
export type Func6<T1, T2, T3, T4, T5, T6, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => R;

/**
 * Represents a function with seven arguments.
 */
export type Func7<T1, T2, T3, T4, T5, T6, T7, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => R;

/**
 * Represents a function with eight arguments.
 */
export type Func8<T1, T2, T3, T4, T5, T6, T7, T8, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => R;
