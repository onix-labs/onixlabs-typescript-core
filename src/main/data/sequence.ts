import { Equatable, Func1, Func2, Constructor, Type, InvalidOperationError, Optional, Action1 } from "../core";
import { Group, GroupedSequence, NumericSequence } from ".";

/**
 * The symbol used to refer to the underlying iterable collection in a sequence.
 */
const ITERABLE: unique symbol = Symbol();

/**
 * Represents a sequence of elements.
 */
export abstract class Sequence<T> implements Iterable<T>, Equatable<Sequence<T>> {
    private readonly [ITERABLE]: T[];

    public [Symbol.iterator](): Iterator<T> {
        return this[ITERABLE][Symbol.iterator]();
    }

    /**
     * Creates a new instance of this class.
     * @param iterable A collection of elements from which to initialize this sequence.
     */
    protected constructor(iterable: Iterable<T>) {
        this[ITERABLE] = Array.from(iterable);
    }

    /**
     * Gets the length of this sequence.
     */
    public get length(): number {
        return this[ITERABLE].length;
    }

    /**
     * Appends an array of items to the sequence.
     * @param items The items to append to the sequence.
     * @return Returns a new sequence containing the elements of this sequence and the appended elements.
     */
    public append(...items: T[]): Sequence<T> {
        return Sequence.from([...this, ...items]);
    }

    /**
     * Computes the average of this sequence.
     * @param selector Selects a numeric value from each element.
     * @returns Returns the average of this sequence.
     */
    public average(selector: Func1<T, number>): number {
        let value: number = 0;
        let count: number = 0;

        for (const element of this) {
            value += selector(element);
            count++;
        }

        return value / count;
    }

    /**
     * Concatenates the sequence with another sequence.
     * @param sequence The other sequence to concatenate with the sequence.
     * @returns Returns a new sequence containing the elements of this sequence and the concatenated elements.
     */
    public concatenate(sequence: Sequence<T>): Sequence<T> {
        return Sequence.from([...this, ...sequence]);
    }

    /**
     * Counts the elements of this sequence.
     * @param predicate The predicate to filter elements in the sequence.
     * @returns Returns a count of all elements in the sequence that match the predicate.
     */
    public count(predicate: Func1<T, boolean> = () => true): number {
        let count: number = 0;

        for (const element of this) {
            if (predicate(element)) count++;
        }

        return count;
    }

    public difference(sequence: Sequence<T>, comparer: Func2<T, T, boolean> = Equatable.equals): Sequence<T> {
        const result: T[] = [];

        if (this.unorderedEquals(sequence)) {
            return Sequence.empty<T>();
        }

        for (const element of this) {
            if (!sequence.includes(element, comparer)) {
                result.push(element);
            }
        }

        return Sequence.from(result);
    }

    public distinct(comparer: Func2<T, T, boolean> = Equatable.equals): Sequence<T> {
        const result: T[] = [];
        let isDistinct: boolean = true;

        for (const thisElement of this) {
            for (const resultElement of result) {
                if (comparer(thisElement, resultElement)) {
                    isDistinct = false;
                    break;
                }
            }

            if (isDistinct) {
                result.push(thisElement);
            }

            isDistinct = true;
        }

        return Sequence.from(result);
    }

    public equals(other: Sequence<T>): boolean {
        return Equatable.equals(this, other)
            || Equatable.orderedArrayEquals(this.toArray(), other.toArray());
    }

    public every(predicate: Func1<T, boolean>): boolean {
        return this[ITERABLE].every(predicate);
    }

    public filter(predicate: Func1<T, boolean>): Sequence<T> {
        return Sequence.from(this[ITERABLE].filter(predicate));
    }

    public filterByType<U extends T>(constructor: Constructor<U>, allowInstances: boolean = true): Sequence<T> {
        const result: U[] = [];

        for (const element of this) {
            if (Type.isPrimitiveOfType(element, constructor)
                || (allowInstances && Type.isInstanceOfType(element, constructor))) {
                result.push(element as U);
            }
        }

        return Sequence.from(result);
    }

    public first(predicate: Func1<T, boolean> = () => true): T {
        if (this[ITERABLE].length === 0) {
            throw new InvalidOperationError("Sequence contains no elements.");
        }

        return this.firstOrDefault(predicate)!;
    }

    public firstOrDefault(predicate: Func1<T, boolean> = () => true): Optional<T> {
        return this[ITERABLE].filter(predicate)[0];
    }

    public flatMap<U>(selector: Func1<T, Iterable<U>>): Sequence<U> {
        const result: U[] = [];

        for (const element of this) {
            result.push(...selector(element));
        }

        return Sequence.from(result);
    }

    public forEach(action: Action1<T>): void {
        for (const element of this) {
            action(element);
        }
    }

    public groupBy<K>(keySelector: Func1<T, K>): GroupedSequence<K, T> {
        const map: Map<K, Sequence<T>> = this.toGroupedMap(keySelector, value => value);
        const groups: Group<K, T>[] = [];

        for (const entry of map.entries()) {
            groups.push({
                key: entry[0],
                values: Sequence.from(entry[1]),
                count: entry[1].count()
            });
        }

        return Sequence.from(groups);
    }

    public includes(item: T, comparer: Func2<T, T, boolean> = Equatable.equals): boolean {
        for (const element of this) {
            if (comparer(element, item)) {
                return true;
            }
        }

        return false;
    }

    public intersect(sequence: Sequence<T>, comparer: Func2<T, T, boolean> = Equatable.equals): Sequence<T> {
        const result: T[] = [];

        for (const element of this) {
            if (sequence.includes(element, comparer)) {
                result.push(element);
            }
        }

        return Sequence.from(result);
    }

    public last(predicate: Func1<T, boolean> = () => true): T {
        if (this[ITERABLE].length === 0) {
            throw new InvalidOperationError("Sequence contains no elements.");
        }

        return this.lastOrDefault(predicate)!;
    }

    public lastOrDefault(predicate: Func1<T, boolean> = () => true): Optional<T> {
        const result: T[] = this[ITERABLE].filter(predicate);
        return result[result.length - 1];
    }

    public map<U>(selector: Func1<T, U>): Sequence<U> {
        return Sequence.from(this[ITERABLE].map(selector));
    }

    public maximum(selector: Func1<T, number>): number {
        return Math.max(...this[ITERABLE].map(selector));
    }

    public minimum(selector: Func1<T, number>): number {
        return Math.min(...this[ITERABLE].map(selector));
    }

    public none(predicate: Func1<T, boolean>): boolean {
        return !this[ITERABLE].some(predicate);
    }

    public prepend(...items: T[]): Sequence<T> {
        return Sequence.from([...items, ...this]);
    }

    public reverse(): Sequence<T> {
        return Sequence.from(this[ITERABLE].slice().reverse());
    }

    public single(predicate: Func1<T, boolean> = () => true): T {
        const result: T[] = this[ITERABLE].filter(predicate);

        if (result.length === 0) {
            throw new InvalidOperationError("Sequence contains no elements.");
        }

        if (result.length > 1) {
            throw new InvalidOperationError("Sequence contains more than one element.");
        }

        return result[0];
    }

    public singleOrDefault(predicate: Func1<T, boolean> = () => true): Optional<T> {
        const result: T[] = this[ITERABLE].filter(predicate);

        if (result.length > 1) {
            throw new InvalidOperationError("Sequence contains more than one element.");
        }

        return result[0];
    }

    public skip(count: number): Sequence<T> {
        return Sequence.from(this[ITERABLE].slice(count));
    }

    public skipLast(count: number): Sequence<T> {
        return Sequence.from(this[ITERABLE].slice(0, this[ITERABLE].length - count));
    }

    public skipWhile(predicate: Func1<T, boolean>): Sequence<T> {
        let count: number = 0;

        for (const element of this) {
            if (!predicate(element)) {
                break;
            }

            count++;
        }

        return this.skip(count);
    }

    public some(predicate: Func1<T, boolean>): boolean {
        return this[ITERABLE].some(predicate);
    }

    public sort(comparer: Func2<T, T, number>): Sequence<T> {
        return Sequence.from(this[ITERABLE].slice().sort(comparer));
    }

    public sortReversed(comparer: Func2<T, T, number>): Sequence<T> {
        return Sequence.from(this[ITERABLE].slice().sort(comparer).reverse());
    }

    public sum(selector: Func1<T, number>): number {
        return this[ITERABLE].map(selector).reduce((a, b) => a + b);
    }

    public symmetricDifference(sequence: Sequence<T>, comparer: Func2<T, T, boolean> = Equatable.equals): Sequence<T> {
        const result: T[] = [];

        if (this.unorderedEquals(sequence)) {
            return Sequence.empty<T>();
        }

        for (const element of this) {
            if (!sequence.includes(element, comparer)) {
                result.push(element);
            }
        }

        for (const element of sequence) {
            if (!this.includes(element, comparer)) {
                result.push(element);
            }
        }

        return Sequence.from(result);
    }

    public take(count: number): Sequence<T> {
        return Sequence.from(this[ITERABLE].slice(0, count));
    }

    public takeLast(count: number): Sequence<T> {
        return Sequence.from(this[ITERABLE].slice(this[ITERABLE].length - count));
    }

    public takeWhile(predicate: Func1<T, boolean>): Sequence<T> {
        let count: number = 0;

        for (const element of this) {
            if (!predicate(element)) {
                break;
            }

            count++;
        }

        return this.take(count);
    }

    public toArray(): T[] {
        return this[ITERABLE].slice();
    }

    public toGroupedMap<K, V>(keySelector: Func1<T, K>, valueSelector: Func1<T, V>): Map<K, Sequence<V>> {
        const result: Map<K, Sequence<V>> = new Map();

        for (const element of this) {
            const key: K = keySelector(element);
            result.set(key, result.get(key)?.append(valueSelector(element)) ?? Sequence.empty<V>());
        }

        return result;
    }

    public toMap<K, V>(keySelector: Func1<T, K>, valueSelector: Func1<T, V>): Map<K, V> {
        const result: Map<K, V> = new Map();

        for (const element of this) {
            const key: K = keySelector(element);

            if (result.has(key)) {
                throw new InvalidOperationError("Duplicate key detected in sequence.");
            }

            result.set(key, valueSelector(element));
        }

        return result;
    }

    public toSet(comparer: Func2<T, T, boolean> = Equatable.equals): Set<T> {
        return new Set(this.distinct(comparer));
    }

    public union(sequence: Sequence<T>, comparer: Func2<T, T, boolean> = Equatable.equals): Sequence<T> {
        return this.concatenate(sequence).distinct(comparer);
    }

    public unorderedEquals(sequence: Sequence<T>): boolean {
        return Equatable.unorderedArrayEquals(this.toArray(), sequence.toArray());
    }

    public zip<U, V>(sequence: Sequence<U>, mergeSelector: Func2<T, U, V>): Sequence<V> {
        const result: V[] = [];
        const count: number = this.count();
        let index: number = 0;

        if (count !== sequence.count()) {
            throw new InvalidOperationError("Cannot zip sequences of different lengths.");
        }

        while (index++ < count) {
            result.push(mergeSelector(this[ITERABLE][index], sequence[ITERABLE][index]));
        }

        return Sequence.from(result);
    }

    public static empty<T>(): Sequence<T> {
        return Sequence.of();
    }

    public static from<T>(iterable: Iterable<T>): Sequence<T> {
        return new (class extends Sequence<T> {
            public constructor() { super(iterable); }
        })();
    }

    public static fromNumeric(iterable: Iterable<number>): NumericSequence {
        return new (class extends Sequence<number> {
            public constructor() { super(iterable); }

            public average(): number {
                let value: number = 0;
                let count: number = 0;

                for (const element of this) {
                    value += element;
                    count++;
                }

                return value / count;
            }

            public maximum(): number {
                return Math.max(...this);
            }

            public minimum(): number {
                return Math.min(...this);
            }

            public sum(): number {
                return this[ITERABLE].reduce((a, b) => a + b);
            }
        })();
    }

    public static of<T>(...items: T[]): Sequence<T> {
        return Sequence.from(items);
    }

    public static ofNumeric(...items: number[]): NumericSequence {
        return Sequence.fromNumeric(items);
    }

    public static range(from: number, to: number): Sequence<number> {
        return Sequence.from(Array.from({ length: to - from + 1 }, (_, n) => from + n));
    }

    public static count(start: number, count: number): Sequence<number> {
        return Sequence.from(Array.from({ length: count }, (_, n) => start + n));
    }

    public static repeat<T>(count: number, item: T): Sequence<T> {
        return Sequence.from(Array.from({ length: count }, () => item));
    }
}
