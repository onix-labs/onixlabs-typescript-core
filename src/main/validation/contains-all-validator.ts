import { PredicateValidator } from ".";
import { Func2, Equatable } from "../core";

export class ContainsAllValidator<T = unknown> extends PredicateValidator<T[]> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => subject.every(left => values.some(right => equalityFunction(left, right))));
    }
}
