import { Enum, Equatable, Comparable, Action2 } from ".";

/**
 * Represents a set of Enum instances.
 */
export class EnumSet<T extends Enum> extends Set<T> implements Equatable<EnumSet<T>> {

    /**
     * Creates a new instance of this class.
     * @param items The Enum items to add to this set.
     */
    public constructor(...items: T[]) {
        super(items);
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: EnumSet<T>): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Gets the contents of this set as an array.
     * @returns Returns an array of Enum instances.
     */
    public toArray(): T[] {
        return Array
            .from(this.values())
            .sort(Comparable.comparableCompare);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return this.toArray().join(", ");
    }

    /**
     * Performs the specified action when the item is present in the enum set.
     * @param item The item to find in the enum set.
     * @param action The action to perform when the item is present in the enum set.
     * @returns Returns this enum set.
     */
    public when(item: T, action: Action2<this, T>): this {
        if (this.has(item)) action(this, item);
        return this;
    }
}
