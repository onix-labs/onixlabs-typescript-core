import { Sequence, Group } from ".";

/**
 * Represents a sequence of groups.
 */
export type GroupedSequence<K, V> = Sequence<Group<K, V>>;
