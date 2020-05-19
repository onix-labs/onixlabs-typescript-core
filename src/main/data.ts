import { Observable, NotifyDispatcher, Equatable, Keyed, TypeInfo } from "./core";

export class KeyChanged<K> {
    public constructor(
        public readonly oldKey: K,
        public readonly newKey: K) {
    }
}

export class ValueChanged<V> {
    public constructor(
        public readonly oldValue: V,
        public readonly newValue: V) {
    }
}

export class PropertyChanged<K, V> {
    public constructor(
        public readonly key: K,
        public readonly oldValue: V,
        public readonly newValue: V) {
    }
}

export class ItemAdded<V> {
    public constructor(
        public readonly index: number,
        public readonly value: V) {
    }
}

export class ItemRemoved<V> {
    public constructor(
        public readonly index: number,
        public readonly value: V) {
    }
}

export class ItemMoved<V> {
    public constructor(
        public readonly oldIndex: number,
        public readonly newIndex: number,
        public readonly value: V) {
    }
}

export class Cleared {
}

export class Pair<K, V> implements Equatable<Pair<K, V>> {
    public constructor(public readonly key: K, public readonly value: V) {
        Object.freeze(this);
    }

    public equals(other: Pair<K, V>): boolean {
        return Equatable.equals(this, other);
    }

    public toMutablePair(): MutablePair<K, V> {
        return new MutablePair(this.key, this.value);
    }

    public toString(): string {
        return `${this.key}: ${this.value}`;
    }
}

export class MutablePair<K, V> implements Equatable<MutablePair<K, V>> {
    public readonly onKeyChanged: Observable<MutablePair<K, V>, KeyChanged<K>>;
    public readonly onValueChanged: Observable<MutablePair<K, V>, ValueChanged<V>>;
    private readonly dispatcher: NotifyDispatcher<MutablePair<K, V>> = new NotifyDispatcher<MutablePair<K, V>>(this);
    private mutableKey: K;
    private mutableValue: V;

    public constructor(key: K, value: V) {
        this.onKeyChanged = this.dispatcher.createObservable();
        this.onValueChanged = this.dispatcher.createObservable();
        this.mutableKey = key;
        this.mutableValue = value;
    }

    public get key(): K {
        return this.mutableKey;
    }

    public set key(newKey: K) {
        const oldKey: K = this.mutableKey;
        this.mutableKey = newKey;
        this.dispatcher.notify(this.onKeyChanged, new KeyChanged(oldKey, newKey));
    }

    public get value(): V {
        return this.mutableValue;
    }

    public set value(newValue: V) {
        const oldValue: V = this.mutableValue;
        this.mutableValue = newValue;
        this.dispatcher.notify(this.onValueChanged, new ValueChanged(oldValue, newValue));
    }

    public equals(other: MutablePair<K, V>): boolean {
        return Equatable.valueEquals(this, other)
            || Equatable.equals(this.key, other.key)
            && Equatable.equals(this.value, other.value);
    }

    public toPair(): Pair<K, V> {
        return new Pair(this.key, this.value);
    }

    public toString(): string {
        return `${this.key}: ${this.value}`;
    }
}

export class ObservableObject<T extends Keyed<any> = any>
    extends Observable<ObservableObject<T>, PropertyChanged<string, T>> {

    public constructor(template: object) {
        super();
        const indexedTemplate: Keyed<T> = template as any;
        if (!TypeInfo.isNullOrUndefined(template)) {
            Object.keys(template).forEach(key => ObservableObject.defineProperty(this, key, indexedTemplate[key]));
        }
    }

    public static defineProperty<T = any>(target: ObservableObject<T>, key: string, value: T): void {
        const indexedTarget: Keyed<T> = target as any;
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: false,
            get: () => indexedTarget[key],
            set: (newValue: T): void => {
                const oldValue: T = indexedTarget[key];
                if (oldValue !== newValue) {
                    indexedTarget[key] = newValue;
                    target.notify(target, new PropertyChanged(key, oldValue, newValue));
                }
            }
        });
    }
}

// export abstract class Iterable<T> {
//     private readonly items: T[] = [];
//     private readonly selectors;

//     public constructor(...items: T[]) {
//         this.items = items;
//     }

//     // union
//     // intersect
//     // difference
//     // last
//     // lastOrDefault
//     // first
//     // fistOrDefault
//     // single
//     // singleOrDefault
//     // orderBy
//     // orderByDescending
//     // skip
//     // take
//     // map
//     // forEach
//     // cast
//     // prepend

//     public append(...values: T[]): Iterable<T> {
//         const result: Iterable<T> = Iterable.from(...this.items);
//         result.selectors.push(() => values.forEach(value => result.items.push(value)));
//         return result;
//     }

//     public compile(): Iterable<T> {

//     }

//     public concat(iterable: Iterable<T>): Iterable<T> {

//     }

//     public contains(value: T, comparer: Func2<T, T, boolean> = Comparer.equals): boolean {

//     }

//     public count(predicate: Func1<T, boolean> = () => true): number {

//     }

//     public distinct(comparer: Func2<T, T, boolean> = Comparer.equals): Iterable<T> {

//     }

//     public elementAt(index: number): T {

//     }

//     public elementAtOrDefault(index: number): Optional<T> {

//     }

//     public every(predicate: Func1<T, boolean>): boolean {
//     }

//     public filter(predicate: Func1<T, boolean>): Iterable<T> {
//         const result: Iterable<T> = Iterable.from(...this.items.filter(predicate));
//         result.selectors.push()
//     }

//     public some(predicate: Func1<T, boolean>): boolean {
//     }

//     public toArray(): T[] {
//         //return this.items.slice();
//     }

//     public static empty<T>(): Iterable<T> {
//         return new (class extends Iterable<T> { })();
//     }

//     public static range(from: number, to: number): Iterable<number> {
//         return new (class extends Iterable<number> {
//             public constructor() {
//                 super(...Array.from(Array(to - from + 1).keys()).map(n => n + from));
//             }
//         })();
//     }

//     public static from<T>(...items: T[]): Iterable<T> {
//         return new (class extends Iterable<T> {
//             public constructor() {
//                 super(...items);
//             }
//         })();
//     }
// }