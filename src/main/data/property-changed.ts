/**
 * Represents a property changed event.
 */
export class PropertyChanged<K, V> {

    /**
     * Creates a new instance of this class.
     * @param key The key of the property that was changed.
     * @param oldValue The old value of the property that was changed.
     * @param newValue The new value of the property that was changed.
     */
    public constructor(
        public readonly key: K,
        public readonly oldValue: V,
        public readonly newValue: V) {
    }
}
