/**
 * Represents a property defined event.
 */
export class PropertyDefined<K, V> {

    /**
     * Creates a new instance of this class.
     * @param key The key of the property that was defined.
     * @param value The value of the property that was defined.
     */
    public constructor(
        public readonly key: K,
        public readonly value: V) {
    }
}
