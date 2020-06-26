import { PredicateValidator } from ".";
import { Type } from "../core";

export class NullValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => Type.isNull(subject));
    }
}
