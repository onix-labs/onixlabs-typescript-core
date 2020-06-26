import { Equatable } from "../core";

/**
 * Represents a key/value pair.
 */
export class KeyValuePair<K, V> implements Equatable<KeyValuePair<K, V>> {

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
    public equals(other: KeyValuePair<K, V>): boolean {
        return Equatable.equals(this, other)
            || Equatable.equals(this.key, other.key)
            && Equatable.equals(this.value, other.value);
    }
}
