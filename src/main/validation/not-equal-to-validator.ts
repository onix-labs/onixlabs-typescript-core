import { PredicateValidator } from ".";
import { Func2, Equatable } from "../core";

export class NotEqualToValidator<T = unknown> extends PredicateValidator<T> {
    public constructor(value: T, equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => !equalityFunction(subject, value));
    }
}
