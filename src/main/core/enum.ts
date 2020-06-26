import { Equatable, Comparable, Optional, Keyed } from ".";

/**
 * Represents the base class for implementing enumerations.
 */
export abstract class Enum implements Equatable<Enum>, Comparable<Enum> {

    /**
     * Creates a new instance of this class.
     * @param value The value of the Enum instance.
     * @param name The name of the Enum instance.
     */
    protected constructor(public readonly value: number, public readonly name: string) {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Enum): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Compares two objects that implement Comparable.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public compareTo(other: Enum): number {
        return Comparable.compare(this, other, enumeration => enumeration.value);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Returns the numeric value of the enumeration.
     * @returns Returns the numeric value of the enumeration.
     */
    public valueOf(): number {
        return this.value;
    }

    /**
     * Gets all Enum instances from this enumeration.
     * @returns Returns an array containing all Enum instances in this enumeration.
     */
    public static getAll<T extends Enum>(): T[] {
        const enumeration: Keyed<any> = this;
        return Object
            .keys(enumeration)
            .filter(name => enumeration[name] instanceof this)
            .map(name => enumeration[name]);
    }

    /**
     * Gets an enumeration by name, or undefined if the enumeration does not exist.
     * @param name The name of the enumeration to get.
     * @returns Returns an enumeration, or undefined if the enumeration does not exist.
     */
    public static fromName<T extends Enum>(name: string): Optional<T> {
        return this.getAll().filter(enumeration => enumeration.name === name)[0] as T;
    }

    /**
     * Gets an enumeration by value, or undefined if the enumeration does not exist.
     * @param value The value of the enumeration to get.
     * @returns Returns an enumeration, or undefined if the enumeration does not exist.
     */
    public static fromValue<T extends Enum>(value: number): Optional<T> {
        return this.getAll().filter(entry => entry.value === value)[0] as T;
    }
}
