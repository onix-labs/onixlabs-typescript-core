import { PredicateValidator } from ".";
import { Type } from "../core";

export class NullOrUndefinedValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => Type.isNullOrUndefined(subject));
    }
}
