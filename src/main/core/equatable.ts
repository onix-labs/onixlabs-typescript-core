import { Func1, Func2 } from ".";

/**
 * Defines a mechanism to compare objects for equality.
 */
export abstract class Equatable<T = unknown> {

    /**
     * Prevents instances of this class from being created.
     */
    private constructor() {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public abstract equals(other: T): boolean;

    /**
     * Compares two objects that implement Equatable.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static equatableEquals<T extends Equatable<T>>(a: T, b: T): boolean {
        return a.equals(b);
    }

    /**
     * Compares the specified objects for eqaulity.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static equals(a: unknown, b: unknown): boolean {
        if (a instanceof Map && b instanceof Map) {
            return Equatable.mapEquals(a, b);
        } else if (a instanceof Set && b instanceof Set) {
            return Equatable.setEquals(a, b);
        } else if (a instanceof Object && b instanceof Object) {
            return Equatable.objectEquals(a, b);
        }
        return Equatable.valueEquals(a, b);
    }

    /**
     * Compares values for equality. This is equivalent to calling Object.is.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static valueEquals(a: any, b: any): boolean {
        return !!Object.is ? Object.is(a, b) : a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b;
    }

    /**
     * Compares objects for equality by comparing their keys and values.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static objectEquals(a: any, b: any): boolean {
        const keys: Func1<object, string[]> = Object.getOwnPropertyNames;
        const symbols: Func1<object, symbol[]> = Object.getOwnPropertySymbols;
        return Equatable.valueEquals(a, b)
            || a !== undefined && b !== undefined
            && a !== null && b !== null
            && typeof a === "object"
            && typeof b === "object"
            && keys(a).length === keys(b).length
            && symbols(a).length === symbols(b).length
            && keys(a).every(key => Equatable.equals(a[key], b[key]))
            && symbols(a).every(symbol => Equatable.equals(a[symbol], b[symbol]));
    }

    /**
     * Compares maps for equality.
     * @param a The first map to compare.
     * @param b The second map to compare.
     * @returns Returns true if the maps are equal; otherwise, false.
     */
    public static mapEquals<K, V>(a: Map<K, V>, b: Map<K, V>): boolean {
        return a.size === b.size
            && Array.from(a.keys()).every(key => b.has(key) && Equatable.equals(a.get(key), b.get(key)));
    }

    /**
     * Compares sets for equality.
     * @param a The first set to compare.
     * @param b The second set to compare.
     * @returns Returns true if the sets are equal; otherwise, false.
     */
    public static setEquals<T>(a: Set<T>, b: Set<T>): boolean {
        return a.size === b.size && Array.from(a.values()).every(value => b.has(value));
    }

    /**
     * Compares arrays for equality with strict order.
     * @param a The first array to compare.
     * @param b The second array to compare.
     * @param comparer Determines how to compare each array element. The default is Equatable.equals.
     */
    public static orderedArrayEquals<T>(a: T[], b: T[], comparer: Func2<T, T, boolean> = Equatable.equals): boolean {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (a.length !== b.length) return false;
        for (let index: number = 0; index < a.length; index++) {
            if (!comparer(a[index], b[index])) return false;
        }
        return true;
    }

    /**
     * Compares arrays for equality with relaxed order.
     * @param a The first array to compare.
     * @param b The second array to compare.
     * @param comparer Determines how to compare each array element. The default is Equatable.equals.
     */
    public static unorderedArrayEquals<T>(a: T[], b: T[], comparer: Func2<T, T, boolean> = Equatable.equals): boolean {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (a.length !== b.length) return false;
        const copy: T[] = b.slice();
        for (const element of a) {
            for (let index: number = 0; index < copy.length; index++) {
                if (comparer(element, copy[index])) {
                    copy.splice(index, 1);
                    break;
                }
            }
        }
        return copy.length === 0;
    }
}
