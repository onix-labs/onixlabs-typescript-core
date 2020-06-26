import { Equatable } from ".";

/**
 * Represents a pseudo-random number generator.
 */
export class Random {

    /**
     * Prevents instances of this class from being created.
     */
    private constructor() {
    }

    /**
     * Generates a new decimal number between the minimum and maximum value.
     * @param minimum The minimum decimal value.
     * @param maximum The maximum decimal value.
     */
    public static decimal(
        minimum: number = Number.MIN_SAFE_INTEGER,
        maximum: number = Number.MAX_SAFE_INTEGER): number {
        return !Equatable.equals(minimum, maximum)
            ? Math.random() * (maximum - minimum + 1) + minimum
            : minimum;
    }

    /**
     * Generates a new integral number between the minimum and maximum value.
     * @param minimum The minimum decimal value.
     * @param maximum The maximum decimal value.
     */
    public static integer(
        minimum: number = Number.MIN_SAFE_INTEGER,
        maximum: number = Number.MAX_SAFE_INTEGER): number {
        return !Equatable.equals(minimum, maximum)
            ? Math.floor(Math.random() * (maximum - minimum + 1) + minimum)
            : minimum;
    }

    /**
     * Generates an array of decimal numbers between the minimum and maximum value.
     * @param minimum The minimum decimal value.
     * @param maximum The maximum decimal value.
     */
    public static decimalArray(
        length: number,
        minimum: number = Number.MIN_SAFE_INTEGER,
        maximum: number = Number.MAX_SAFE_INTEGER): number[] {
        return Array.from({ length }, () => Random.decimal(minimum, maximum));
    }

    /**
     * Generates an array of integral numbers between the minimum and maximum value.
     * @param minimum The minimum decimal value.
     * @param maximum The maximum decimal value.
     */
    public static integerArray(
        length: number,
        minimum: number = Number.MIN_SAFE_INTEGER,
        maximum: number = Number.MAX_SAFE_INTEGER): number[] {
        return Array.from({ length }, () => Random.integer(minimum, maximum));
    }
}
