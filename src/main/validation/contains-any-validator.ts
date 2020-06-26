import { PredicateValidator } from ".";
import { Func2, Equatable } from "../core";

export class ContainsAnyValidator<T = unknown> extends PredicateValidator<T[]> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => subject.some(left => values.some(right => equalityFunction(left, right))));
    }
}
