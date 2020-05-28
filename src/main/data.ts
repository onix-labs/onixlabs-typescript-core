import { Equatable } from "./core";

/**
 * Represents a mutable key/value pair.
 */
export class MutableKeyValuePair<K, V> implements Equatable<MutableKeyValuePair<K, V>> {

    /**
     * Creates a new instance of this class.
     * @param key The key component of the key/value pair.
     * @param value The value component of the key/value pair.
     */
    public constructor(public key: K, public value: V) {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: MutableKeyValuePair<K, V>): boolean {
        return Equatable.equals(other, this);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return JSON.stringify(this);
    }
}

/**
 * Represents an immutable, or readonly key/value pair.
 */
export type KeyValuePair<K, V> = Readonly<MutableKeyValuePair<K, V>>;