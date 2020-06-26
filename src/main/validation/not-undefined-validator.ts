import { PredicateValidator } from ".";
import { Type } from "../core";

export class NotUndefinedValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => !Type.isUndefined(subject));
    }
}
