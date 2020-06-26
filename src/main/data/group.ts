import { Sequence } from ".";

/**
 * Represents a sequence of elements, grouped by key.
 */
export class Group<K, V> {

    /**
     * Creates a new instance of this class.
     * @param key The key by which values are grouped.
     * @param values The elements of the sequence group.
     * @param count The count of elements in the group.
     */
    public constructor(
        public readonly key: K,
        public readonly values: Sequence<V>,
        public readonly count: number) {
    }
}
