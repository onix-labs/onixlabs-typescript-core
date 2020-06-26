/**
 * Represents a property deleted event.
 */
export class PropertyDeleted<K, V> {

    /**
     * Creates a new instance of this class.
     * @param key The key of the property that was deleted.
     * @param value The value of the property that was deleted.
     */
    public constructor(
        public readonly key: K,
        public readonly value: V) {
    }
}
