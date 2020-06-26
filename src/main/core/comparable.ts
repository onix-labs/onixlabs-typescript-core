import { Func1 } from ".";

/**
 * Defines a mechanism to compare objects for relative order.
 */
export abstract class Comparable<T = unknown> {

    /**
     * Prevents instances of this class from being created.
     */
    private constructor() {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of this object to the other object.
     */
    public abstract compareTo(other: T): number;

    /**
     * Compares two objects that implement Comparable.
     * @param left The left-hand-side object to compare.
     * @param right The right-hand-side object to compare.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public static comparableCompare<T extends Comparable<T>>(left: T, right: T): number {
        return left.compareTo(right);
    }

    /**
     * Selects a numeric value from the specified objects and compares them.
     * @param left The left-hand-side object to select and compare.
     * @param right The right-hand-side object to select and compare.
     * @param selector The selector function which selects a numeric value from the specified objects.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public static compare<T>(left: T, right: T, selector: Func1<T, number>): number {
        return Comparable.numberCompare(selector(left), selector(right));
    }

    /**
     * Compares two numbers.
     * @param left The left-hand-side number to compare.
     * @param right The right-hand-side number to compare.
     * @returns Returns a numeric value indicating the relative order of the left number to the right number.
     */
    public static numberCompare(left: number, right: number): number {
        return left === right ? 0 : left > right ? 1 : -1;
    }

    /**
     * Compares two strings.
     * @param left The left-hand-side string to compare.
     * @param right The right-hand-side string to compare.
     * @return Returns a numeric value indicating the relative order of the left string to the right string.
     */
    public static stringCompare(left: string, right: string): number {
        return left.localeCompare(right);
    }
}
