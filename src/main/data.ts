import { Equatable } from "./core";

export class Pair<K, V> implements Equatable<Pair<K, V>> {

    public constructor(public readonly key: K, public readonly value: V) {
        Object.freeze(this);
    }

    public equals(other: Pair<K, V>): boolean {
        return Equatable.equals(other, this);
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}