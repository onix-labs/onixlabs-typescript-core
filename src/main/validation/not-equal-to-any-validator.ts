import { PredicateValidator } from ".";
import { Func2, Equatable } from "../core";

export class NotEqualToAnyValidator<T = unknown> extends PredicateValidator<T> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => !values.some(other => !equalityFunction(subject, other)));
    }
}
